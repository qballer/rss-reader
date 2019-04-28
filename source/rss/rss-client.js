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
  const parser = new window.RSSParser()
  const feed = await parser.parseURL(feedUrl)
  feed.name = name
  feed.url = url
  emitter.dispatchEvent(createEvent(eventRssItems, feed))
  return feed
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
