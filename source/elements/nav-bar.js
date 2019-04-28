import { html, LitElement } from 'https://unpkg.com/lit-element?module'
import { createEvent, eventChangeCurrent } from '../rss/events.js'

export class NavBar extends LitElement {
  static get properties () {
    return {
      list: { type: Array },
      emitter: { type: Object }
    }
  }

  constructor () {
    super()
    this.list = []
    this.emitter = {}
    this.changeCurrent = this.changeCurrent.bind(this)
  }

  changeCurrent (e) {
    const { url, name } = e
    this.emitter.dispatchEvent(createEvent(eventChangeCurrent, { name, url }))
  }

  render () {
    return html`
      <nav>
        ${this.list.map((listItem) => html`
        <nav-item
          @click=${this.changeCurrent}
          changeCurrent=${this.changeCurrent}
          url=${listItem.url}
          name=${listItem.name}>
        </nav-item>`)}
      </nav>
    `
  }
}
