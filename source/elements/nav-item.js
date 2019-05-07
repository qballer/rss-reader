import { html, LitElement } from 'https://unpkg.com/lit-element?module'

export class NavItem extends LitElement {
  static get properties () {
    return {
      name: { type: String },
      url: { type: URL },
      changeCurrent: { type: Function }
    }
  }

  constructor () {
    super()
    this.name = ''
    this.url = new URL('javascript:;')
    this.enrichChangeEvent = this.enrichChangeEvent.bind(this)
  }

  enrichChangeEvent (e) {
    e.name = this.name
    e.url = this.url
  }

  render () {
    return html`
        <style>
          div {
            cursor: pointer
          }
        </style>
        <div @click=${this.enrichChangeEvent}>${this.name}</div>
    `
  }
}
