import ky from 'https://unpkg.com/ky@0.10.0/index.js'
import { xmlToJson } from '../utils/xml-to-json.js'

export async function start (name, url) {
  const fixedTimer = 10 * 1000
  return {
    name,
    url,
    timer: fixedTimer // TODO: implement timer.
  }
}

function feedKey (name, url) {
  return `${name.split(' ').join('')}@${url.trim()}`
}
async function pollFeed (feedURL) {
  const url = `https://cors-anywhere.herokuapp.com/${feedURL}` // hack to avoid cors problem
  const feed = await ky.get(url).text()
  const feedJSON = parseXML(feed)
  return feedJSON
}

function parseXML (toParse) {
  const parser = new DOMParser()
  const xml = parser.parseFromString(toParse, 'text/xml')
  const result = xmlToJson(xml)
  return parseXML(result)
}

export function creatClient (store, options) {
  const feeds = initializeFeeds(store)
  return {
    startFeed: async (name, url) => {
      feeds[feedKey] = feeds[feedKey(name, url)] || start(name, url)
      return feeds[feedKey]
    },
    stopFeed: async (name, url) => {

      // send an event
    },
    pollFeed
  }
}

function initializeFeeds (store) {

}
