export const eventRssItems = 'rss-item'
export const eventRssItemsStored = 'rss-items-stored'

export function createEvent (name, data) {
  const event = new window.CustomEvent(name, { detail: data })
  return event
}
