export function createFeedKey (name, url) {
  return `${name.split(' ').join('')}@${url.trim()}`
}
