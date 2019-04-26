export const eventRssItems = 'rss-item'
export const eventRssItemsStored = 'rss-items-stored'

export function createEvent (name, data) {
  const options = {
    detail: data,
    composed: true,
    target: window
  }
  const event = new window.CustomEvent(name, options)
  return event
}
