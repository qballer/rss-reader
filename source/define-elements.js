import { Item, ItemList } from './elements'

export function defineElements (elements) {
  function convertToKebabCase (str) {
    return str.replace(/\s+/g, '-').toLowerCase()
  }

  elements.forEach(element => {
    window.customElements.define(convertToKebabCase(element.name), element)
  })
}

export const elements = [Item, ItemList]
