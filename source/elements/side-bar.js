import { html, LitElement } from 'https://unpkg.com/lit-element?module'
export class SideBar extends LitElement {
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
        ${this.list.map((listItem) => html`${listItem.name}`)}
      </div>
    `
  }
}

// global scope - no.
// window.customElements.define('rss-item', Item)
