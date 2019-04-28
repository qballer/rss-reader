import { createClient } from './rss-client.js'
import { createFeedKey } from './feed-key.js'
import { eventRssItems, eventUpdateCurrentList, createEvent, eventRSSChannelsUpdates, eventChangeCurrent } from './events.js'

export function createStore (
  emitter = new window.EventTarget(),
  loader = loadStore,
  clientFactory = createClient) {
  const data = loader()
  const rssClient = clientFactory(emitter, data)
  let current = Object.keys(data)[0]

  const store = {
    emitter,
    add: async function (info) {
      const key = createFeedKey(info.name, info.url)
      if (data[key]) {
        console.error('feed already exist.')
        return
      }

      data[key] = { ...info, history: [] }
      rssClient.startFeed(info)
      setTimeout(() => emitter.dispatchEvent(createEvent(eventRSSChannelsUpdates, {})), 0)
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
      setTimeout(() => emitter.dispatchEvent(createEvent(eventRSSChannelsUpdates, {})), 0)
    },

    getFeed: function (id, amount = 10) {
      return data[id].history.slice(-data[id].history.length, -data[id].history.length + amount)
    },

    getCurrentFeed: function () {
      return store.getFeed(current)
    },

    changeCurrentFeed: function (e) {
      console.log(e)
    },

    addToFeed: async function (info) {
      const eventData = info.detail
      const key = createFeedKey(eventData.name, eventData.url)
      data[key].history.push(...eventData.items)
      return emitter.dispatchEvent(createEvent(eventUpdateCurrentList, { feedId: key }))
    },

    getSideBarList: function () {
      return Object.keys(data).map((item) => ({ name: item.split('@')[0], url: item.split('@')[1] }))
    }
  }

  emitter.addEventListener(eventRssItems, (e) => setTimeout(() => store.addToFeed(e), 0))
  emitter.addEventListener(eventChangeCurrent, (e) => setTimeout(() => store.changeCurrentFeed(e), 0))

  return store
}

export function loadStore () {
  return {
    'ECHO.js@https://echojs.com/rss': {
      name: 'ECHO.js',
      url: 'https://echojs.com/rss',
      history: []
    },
    'hacker_news@https://news.ycombinator.com/rss': {
      name: 'hacker_news',
      url: 'https://news.ycombinator.com/rss',
      history: []
    }
  }
}
