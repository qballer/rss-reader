import { defineElements, elements } from './define-elements'
import { createStore } from './rss'

export function main () {
  defineElements(elements)
  const emitter = new window.EventTarget()
  const store = createStore(emitter)
  store.getFeed()
}
