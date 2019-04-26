import { defineElements, elements } from './define-elements.js'
import { createStore, eventRssItemsStored } from './rss/index.js'

export function main () {
  defineElements(elements)
  const emitter = new window.EventTarget()
  emitter.addEventListener(eventRssItemsStored, function (e) {
    const feed = store.getFeed(e.detail.feedId)
    renderFeed(feed)
  })
  const store = createStore({ emitter })
}

function renderFeed (feed) {
  const element = document.querySelector('#main-list')
  element.list = feed
}
