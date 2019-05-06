import { defineElements } from './utils/define-elements.js'
import { createStore, eventUpdateCurrentList, eventRSSChannelsUpdates } from './rss/index.js'
import { elements } from './elements/index.js'

export function main () {
  defineElements(elements)
  const store = createStore()
  hookUpEvents(store)
  topLevelRender(store.getSideBarList(), '#side-bar', store.emitter)
}

function hookUpEvents (store) {
  store.emitter.addEventListener(eventUpdateCurrentList, function (e) {
    const feed = store.getCurrentFeed()
    topLevelRender(feed, '#main-list')
  })
  store.emitter.addEventListener(eventRSSChannelsUpdates, function (e) {
    const list = store.getSideBarList()
    topLevelRender(list, '#side-bar', store.emitter)
  })
}

function topLevelRender (feed, selector, emitter) {
  const element = document.querySelector(selector)
  element.list = feed
  if (emitter) {
    element.emitter = emitter
  }
}
