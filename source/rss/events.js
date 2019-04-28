export const eventRssItems = 'rss-item'
export const eventUpdateCurrentList = 'rss-update-current-list'
export const eventRSSChannelsUpdates = 'rss-channels-updated'
export const eventChangeCurrent = 'change-current'

export function createEvent (name, data) {
  const options = {
    detail: data,
    composed: true,
    target: window
  }
  const event = new window.CustomEvent(name, options)
  return event
}
