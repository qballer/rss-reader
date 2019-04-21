import ky from 'https://unpkg.com/ky@0.10.0/index.js'
import {xmlToJson} from './xml-to-json'

export async function start() {
    const result = await getFeed('https://echojs.com/rss')
    const rss = convertToJson(result)
}

async function getFeed(feedURL) { 
    const url = `https://cors-anywhere.herokuapp.com/${feedURL}`  // hack to avoid cors problem
    const feed = await ky.get(url).text()
    return feed
}

function parseXML(toParse) {
    const parser = new DOMParser()
    const xml = parser.parseFromString(toParse, 'text/xml');
    const result = xmlToJson(xml)
    debugger
    return result
}


