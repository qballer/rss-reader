import { createClient } from './rss-client.js'
import { createFeedKey } from './feed-key.js'
import { eventRssItems, eventRssItemsStored, createEvent } from './events.js'

export function createStore (
  { emitter,
    loader = loadStore,
    clientFactory = createClient }) {
  const data = loader()
  const rssClient = clientFactory(emitter, data)
  const store = {
    add: async function (info) {
      const key = createFeedKey(info.name, info.url)
      if (data[key]) {
        console.error('feed already exist.')
        return
      }

      data[key] = { ...info, history: [] }
      rssClient.startFeed(info)
    },

    remove: async function (info) {
      const key = createFeedKey(info.name, info.url)
      const feed = data[key]
      if (feed) {
        console.error('no such feed.')
        return
      }
      rssClient.stopFeed(feed)
      delete data[key]
    },
    getFeed: function (id, amount = 10) {
      return data[id].history.slice(-data[id].history.length, -data[id].history.length + amount)
    },
    addToFeed: async function (info) {
      const eventData = info.detail
      const key = createFeedKey(eventData.name, eventData.url)
      data[key].history.push(...eventData.rss.channel.item)
      return emitter.dispatchEvent(createEvent(eventRssItemsStored, { feedId: key }))
    }
  }
  emitter.addEventListener(eventRssItems, (e) => setTimeout(() => store.addToFeed(e), 0))

  return store
}

export function loadStore () {
  return {
    'ECHO.js@https://echojs.com/rss': {
      name: 'ECHO.js',
      url: 'https://echojs.com/rss',
      history: []
    }
  }
}
