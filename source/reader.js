import { defineElements } from './define-elements.js'
import { createStore, eventRssItemsStored, sideBarListUpdated } from './rss/index.js'
import { elements } from './elements/index.js'

export function main () {
  defineElements(elements)
  const store = createStore()
  hookUpEvents(store)
  topLevelRender(store.getSideBarList(), '#side-bar')
}

function hookUpEvents (store) {
  store.emitter.addEventListener(eventRssItemsStored, function (e) {
    const feed = store.getFeed(e.detail.feedId)
    topLevelRender(feed, '#main-list')
  })
  store.emitter.addEventListener(sideBarListUpdated, function (e) {
    const list = store.getSideBarList()
    topLevelRender(list, '#side-bar')
  })
}

function topLevelRender (feed, selector) {
  const element = document.querySelector(selector)
  element.list = feed
}
