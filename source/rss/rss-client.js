import ky from 'https://unpkg.com/ky@0.10.0/index.js'
import { xmlToJson, createFeedKey } from '../utils'
import { eventRssItems } from './events'

async function start (name, url, emitter) {
  const fixedTimer = 10 * 1000

  function timerHandler () {
    pollFeed(name, url, emitter)
    startData.timer = setTimeout(timerHandler, fixedTimer)
  }

  const startData = {
    name,
    url,
    timer: setTimeout(timerHandler, fixedTimer)
  }
  return startData
}

async function pollFeed (name, url, emitter) {
  const feedUrl = `https://cors-anywhere.herokuapp.com/${url}` // hack to avoid cors problem
  const feed = await ky.get(feedUrl).text()
  const feedJSON = parseXML(feed)
  emitter.dispatchEvent(new window.Event(eventRssItems, feedJSON))
  return feedJSON
}

function parseXML (toParse) {
  const parser = new window.DOMParser()
  const xml = parser.parseFromString(toParse, 'text/xml')
  const result = xmlToJson(xml)
  return parseXML(result)
}

export function creatClient (emitter, data) {
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
      }
      delete feeds[key]
    },
    poll: async function ({ name, url }) {
      return pollFeed(name, url, emitter)
    }
  }
  Object.values(data).map((value) => client.startFeed(value))
  return client
}
