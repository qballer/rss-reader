import { html, LitElement } from 'https://unpkg.com/lit-element?module'

export class RssItem extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      guid: { type: String },
      link: { type: URL },
      isRead: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.title = ''
    this.guid = ''
    this.link = new URL('javascript:;')
    this.isRead = false
  }

  render () {
    return html`
      <span key=${this.guid}>
        <a href=${this.link}  target="_blank"><h4>${this.title}</h4></a>
       <slot></slot>
      </span>
    `
  }
}

// global scope - no.
// window.customElements.define('rss-item', Item)
