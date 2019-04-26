import ky from 'https://unpkg.com/ky@0.10.0/index.js'
import { xmlToJson } from '../utils/xml-to-json.js'
import { eventRssItems, createEvent } from './events.js'
import { createFeedKey } from './feed-key.js'

async function start (name, url, emitter) {
  const fixedTimer = 10 * 1000

  async function timerHandler () {
    await pollFeed(name, url, emitter)
    startData.timer = setTimeout(timerHandler, fixedTimer)
  }

  const startData = {
    name,
    url,
    timer: setTimeout(timerHandler, 0)
  }
  return startData
}

async function pollFeed (name, url, emitter) {
  const feedUrl = `https://cors-anywhere.herokuapp.com/${url}` // hack to avoid cors problem
  const feed = await ky.get(feedUrl).text()
  const feedJSON = parseXML(feed)
  feedJSON.name = name
  feedJSON.url = url
  emitter.dispatchEvent(createEvent(eventRssItems, feedJSON))
  return feedJSON
}

function parseXML (toParse) {
  const parser = new window.DOMParser()
  const xml = parser.parseFromString(toParse, 'text/xml')
  const result = xmlToJson(xml)
  return result
}

export function createClient (emitter, data) {
  const feeds = {}
  const client = {
    startFeed: function ({ name, url }) {
      const key = createFeedKey(name, url)
      feeds[createFeedKey(name, url)] = feeds[key] || start(name, url, emitter)
      return feeds[key]
    },
    stopFeed: function ({ name, url }) {
      const key = createFeedKey(name, url)
      if (feeds[key]) {
        clearTimeout(feeds[key].timer)
        delete feeds[key]
      }
    },
    poll: async function ({ name, url }) {
      return pollFeed(name, url, emitter)
    }
  }
  Object.values(data).map((value) => client.startFeed(value))
  return client
}
