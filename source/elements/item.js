import { html, LitElement } from 'https://unpkg.com/lit-element?module'

export class RssItem extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      guid: { type: String },
      link: { type: URL }
    }
  }

  constructor () {
    super()
    this.title = ''
    this.guid = ''
    this.link = new URL('javascript:;')
  }

  render () {
    return html`
      <span key=${this.guid}>
        <a href=${this.link}><h1>${this.title}</h1></a>
        <slot></slot>
      </span>
    `
  }
}

// global scope.
// window.customElements.define('rss-item', Item)
