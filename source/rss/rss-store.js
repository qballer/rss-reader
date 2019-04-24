import { createClient } from './rss-client.js'
import { createFeedKey } from './feed-key.js'
import { eventRssItems, eventRssItemsStored } from './events.js'

export function createStore (
  { emitter = new window.EventTarget(),
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
    getFeed: async function (info, amount = 10) {

    },
    addToFeed: async function (info) {
      const key = createFeedKey(info.name, info.url)

      emitter.dispatchEvent(new window.Event(eventRssItemsStored, { feedId: key }))
    }
  }

  emitter.addEventListener(eventRssItems, data.addToFeed.bind(data))

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
