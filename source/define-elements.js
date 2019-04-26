import { RssItem, ItemList } from './elements/index.js'

export function defineElements (elements) {
  const toKebabCase = str =>
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');

  elements.forEach(element => {
    window.customElements.define(toKebabCase(element.name), element)
  })
}

export const elements = [RssItem, ItemList]
