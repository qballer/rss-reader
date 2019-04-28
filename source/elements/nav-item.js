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
    this.notifyChange = this.notifyChange.bind(this)
  }

  notifyChange (e) {
    this.changeCurrent(this.name, this.url)
  }

  render () {
    return html`
        <div @click=${this.notifyChange}>${this.name}</div>
    `
  }
}
