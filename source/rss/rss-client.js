import ky from 'https://unpkg.com/ky@0.10.0/index.js'
import { xmlToJson } from '../utils/xml-to-json.js'

export async function start() {
    // const url = 'https://echojs.com/rss'
    const url = 'https://twitrss.me/twitter_search_to_rss/?term=bit_srs'
    const result = await getFeed(url)
}

async function getFeed(feedURL) {
    const url = `https://cors-anywhere.herokuapp.com/${feedURL}`  // hack to avoid cors problem
    const feed = await ky.get(url).text()
    return feed
}

function parseXML(toParse) {
    const parser = new DOMParser()
    const xml = parser.parseFromString(toParse, 'text/xml')
    const result = xmlToJson(xml)
    return parseXML(result)
}

export function creatClient(store, options) {
    const feeds = initializeFeeds(store)
    return {
        startFeed: async (name, url) => {},
        stopFeed: async (name, url) => {},
        getFeed
    }
}
