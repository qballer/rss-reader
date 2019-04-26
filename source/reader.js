import { defineElements, elements } from './define-elements.js'
import { createStore, eventRssItemsStored } from './rss/index.js'

export function main () {
  defineElements(elements)
  const emitter = new window.EventTarget()
  emitter.addEventListener(eventRssItemsStored, function (e) {
    console.log('yo')
    const feed = store.getFeed(e.data)
    console.log('feed:', JSON.stringify(feed))
  })
 const store = createStore(emitter)
}
