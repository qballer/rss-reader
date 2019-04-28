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
    <style>
      .item-title {
        margin-top: 0;
        margin-bottom: 20px;
      }
    </style>
        <span key=${this.guid}>
        <a href=${this.link} target="_blank"><h4 class="item-title">${this.title}</h4></a>
       <slot></slot>
      </span>
    `
  }
}
