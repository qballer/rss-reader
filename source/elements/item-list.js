import { html, LitElement } from 'https://unpkg.com/lit-element?module'

export class ItemList extends LitElement {
  static get properties () {
    return {
      list: { type: Array }
    }
  }

  constructor () {
    super()
    this.list = []
  }

  render () {
    return html`
    <div>
      ${this.list.map(item => html`
            <rss-item
              title="${item.title}"
              guid=${item.guid}
              link="${item.link}">
              <a href=${item.comments} target="_blank">${item.contentSnippet}</div>
            </rss-item>`)}
    </div>`
  }
}
