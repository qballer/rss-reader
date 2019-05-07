Prototyping with Web Components - RSS Reader - part (1). (events, client, store, elements)
---------------------------------------------------------------------------------------
We are about to embark on an exploration journey, down the path of prototyping an application using web components, es6 modules, event target, bit cli and what not. In this blog post series I plan to introduce to you this vibrant web standard called Web Components in a way of joined discovery. Here, we will learn together how to use web components and explore some additional goodies. By all means, I'm no expert in the field and would love to see inputs from the community on how this work can and should improve. Our end result will look as following:

![RSS Reader](/../assets/end-result.png?raw=true "RSS Reader")


Web Components - Why ?
-----------------------------
 The main focus of the series is web components and before we dive in I would like to stop and talk about why you would choose web components as your UI strategy. There are a few reasons:

 1. Future proofing - They used to call it javascript fatigue, but that term has fallen out of grace. Now, sometimes I hear people speak in the terms of future proofing. One of the main reasons to go down this road is that these UI components are a standard, and supported by the browser. In the short history of the web, choosing the standard has proven useful. Developers remember this.

 2. Framework agnostic - What do you do when you have several teams, working on a big application with a few libraries like Vue and React. Some times you would like the same functionality across all those libraries and this feat is hard to reach. Sometimes you have multiple teams on different versions of React which require the same component.

 3. Reusable design system - Another perspective for framework agnostic components is when you need to create a design system for your team. Web components seems like the most sane way to achieve that.

 4. Bundle size, why should I ship something which the browser can already do. VDOM rendering is and was a mind blowing concept, but this can achieve much more. Now don't get me wrong, React is more mature and ready in terms of API usage and supporting libraries, but sometimes size really matters.

What are web components ?
---------------------------
In it's core, web components allow you to develop an encapsulated component from the rest of the document. A vanilla way to do things. This document isn't meant to be a full blown guide to the web components API, there are many others [TODO: insert links]. Never the less this is the main offering of web components:

1. Custom Element - Javascript API which allows you to define a new kind of html tag, specific to your component collection.

2. HTML templates - introducing the `<template>` and `<slot>` tags, which allow you to specify the layout of the template.

3. Shadow DOM - or as I call it, the "mini dom" which is specific to your component. Some kind of an isolated environment for your component DOM, separated from the rest of the document.

These 3 API's together allow you to encapsulate the functionality of a component and isolate it from the rest of the APP with ease.
It also allows you to essentially extend your DOM api with additional tags.

How does lit work ?
-----------------------------
Lit is an abstraction on top of the vanilla api which provides two main things:
 - lit-html a library for html templating. This library provides an easy way to create html template. It basically allows you to create re-useable html templates in the javascript context. The library uses a great feature called tagged templates, shipped with es6 which looks like this:
-
```javascript
    tag`some ${boilerPlate} in my string`
```
this feature allows us to parse the string with a custom function. This is the core of lit-html, which allows us to combine templating in our javascipt
directly in the browser. In the case of lit a render function inside a lit element component can contain an expression like the following:

```javascript
    // bind function to click
    // bind text to button body
    html`<button @click=${myFunc}>${buttonText}</button>`

    // it can also be composable and conditional
    // here we see internal lit components rendered according to a condition.
    html`<div>${isReady ? html`<main-app>`: html`<app-load/>` }</div>`
```

for more information on the lit syntax I suggest your read from their docs [here](https://lit-html.polymer-project.org/guide/template-reference).

 -  lit-element - base class for components. In the modern era we need to manage the life cycle of the component. Yea, we can do this from javascript without any abstractions on top of that. What lit-element does for us is give us a way to define props, hook to component lifecycle and unified component interface.
 We will go over a component later with more details.

for a bit deeper dive let's look at the nav-bar component:
```javascript
// imports are all es6 modules
import { html, LitElement } from 'https://unpkg.com/lit-element?module'
import { createEvent, eventChangeCurrent } from '../rss/events.js'

// we extend the LitElement component to have a common life cycle.
export class NavBar extends LitElement {

// lit uses this static function to track the properties the component needs to receive
// every time these properties change it will re-render.
  static get properties () {
    return {
      list: { type: Array }, // notice we use the built in Array class as type
      emitter: { type: Object }
    }
  }

  constructor () {
    super()
    this.list = [] // we need to initialize our properties
    this.emitter = {}
    this.changeCurrent = this.changeCurrent.bind(this) // bind changeCurrent before passing it to lit
                                                       // you should always bind once.
  }

    // click handler.
  changeCurrent (e) {
    const { url, name } = e
    // like in our rss client, all communication is done via event emitters
    this.emitter.dispatchEvent(createEvent(eventChangeCurrent, { name, url }))
  }

  render () {
    // we return an html function call to parse our html template
    return html`
      <nav>
        <!-- inner lit components are composed with another template -->
        ${this.list.map((listItem) => html`
        <!-- all custom element must use a '-' in the name, so the browser will ignore them on initial rendering-->
        <nav-item
        <!-- syntax for binding an event handler -->
          @click=${this.changeCurrent}
        <!-- pass in properties as attributes on the -->
          changeCurrent=${this.changeCurrent}
          url=${listItem.url}
          name=${listItem.name}>
        </nav-item>`)}
      </nav>
    `
  }
}

// in most code examples you would see `window.customElements.define`call to
// register the component in the browser. I see this as breaking encapsulation.
// This is not lit faults, it's part of the spec which can improve.
```

RSS-Reader - this is so 1999 ?
-----------------------------
When considering the example we would explore, a todo app came to mind. Yes, it is a great example done many times over. It has become some what of the "hello world" for any UI based technology. Yet, I felt not only it's been explored and lacks the meat, sort to speak, of a real world app. I wanted to create a concise enough example to discuss freely over blog posts, and broad enough to provide real value. Hence our friendly RSS reader came to mind. For those of you unfamiliar with RSS, it is a syndication protocol created in the turn of the century to allow users and application access to updates of online content. I've been using it for years to keep tabs on blogs and forums which I like. So without further ado ...

You can can find the source code of the project in this [repository](https://github.com/qballer/rss-reader). I encourage you to find my code smells, and offer pull requests, which will improve this guide. The highlights would be mentions in future blog post about this application. like I mentioned earlier this is a joined exploration, and any contributions are welcomed.

Some general design decision:
1. Lit-element - this project is using the fine work of lit-html and lit-element by the polymer team. It seems like a great library to work with on top the web component standard which takes away a lot of boilerplate pain. It's important to note that lit was heavily inspired by [hyper](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api), another great library worth exploring.
2. Bundle free (almost) - Whishing to explore some more new features of the web, this project utilize es6 modules heavily. This is but with one exception to the rule, the [RSS parser](https://github.com/bobby-brennan/rss-parser#readme) by bobby-brennan is a "normal" browser package.
3. Browser only - this project doesn't have a backend component because I feel Server Side Rendering is a topic for a different post which will go in more details.
4. All modules are made available on the [bit.dev](https://bit.dev) component platform for future reuse. The bit cli and and platform (which is my full time job) is one of the best ways to share JS components in general and web components specifically. It also has the great benefit of encouraging modularity.
5. This project uses timers and `eventTarget` heavily instead of workers. Workers don't play well with es6 modules. When those reach to full working state, I would be more than happy to refactor.
6. This repo is in the prototyping phase and so it doesn't contain tests. I believe in tests, and will insert them in the future. This may go against TDD but I feel wouldn't contribute to the learning process currently. When it would be added I will share the refactoring needed to introduce tests.

Lets review the main entry points of the app to grasp what going on.
`index.html`
```html
<html>
    <head>
        <title>RSS Reader</title>
        <style>
            main {
                display: flex;
            }
            nav-bar {
                margin-right: 20px
            }
        </style>
    </head>
    <body>

        <main id="main-app">
            <!-- two main components one for the left panel
                 and one for rendering the rss items  -->
            <nav-bar id="side-bar"></nav-bar>
            <item-list id="main-list"></item-list>
        </main>
        <!-- non es module to have RSS parser-->
        <script src="https://unpkg.com/rss-parser@3.7.0/dist/rss-parser.js"></script>
        <script type="module">
            import { main } from '/source/reader.js'
            main()
        </script>
    </body>
</html>
```

Here is the main function in the `reader.js` file:

```javascript
export function main () {
  defineElements(elements) // define all elements in one place
  const store = createStore() // create main store to update for new channels
  hookUpEvents(store) // define main events from the ui to the store.
  topLevelRender(store.getSideBarList(), '#side-bar', store.emitter) // render side-bar.
}
```

The gist of things is that everything communicates via events and that way every component in the app is independent.
For the rest of the app view the repo.

Project Structure - taking modularity to heart.
-----------------------------
1. `index.html` - as the main layout of the project.
2. `reader.js` - the main javascript file of the project, setting up event emitters.
3. elements folder - lit-element web components.
   1. `item-list.js` - the feed item list rendering the current selected feed.
   2. `nav-bar.js` - edit feeds and consume them.
   3. `rss-item.js/nav-item.js  ` - representing a single fragment inside their respective lists.
4. rss folder
   1. `events.js` - containing all event names and event creation function.
   2. `feed-key.js` - function for creating a unique feed key in the store.
   3. `rss-client.js` - get and parse rss feeds.
   4. `rss-store` - the application main state.
5. utils folder
   1. `defer-function.js` used to make dispatch events async.
   2. `define-elements.js` - escape web components global as much as possible.

It's worth noting that the structure of the app, is that it has modularity at heart. All the folders in the project basically contain components of different kinds. Our main drive for reusability is the bit CLI. Bit is a tool which helps your write more modular code, it does so managing the source code and dependencies of a component. Since I've started working with bit it has impacted the way I think about modularity and separation of concerns in a deep way. Bit won't save you from writing bad code, but the `add` and `export` process forces you to at least consider it. The added benefit is that you can share components between future projects, or existing ones.

Lets dive into another component. Here is the code for the rss client component.

```javascript

//imports include a .js file because these are es6 modules (detailed later)
import { eventRssItems, createEvent } from './events.js'
import { createFeedKey } from './feed-key.js'

// creates a client object with the startFeed, stopFeed, and poll functions
// emitter - communication medium to dispatch events
// data - array of url:string and name:string to identify channels
export function createClient (emitter, data) {
  const feeds = {}
  const client = {
    // Receives a data object with name and url and starts to track it over time
    startFeed: function ({ name, url }) {
      const key = createFeedKey(name, url) // createFeedKey is the primary key for channels in the app.
      feeds[createFeedKey(name, url)] = feeds[key] || start(name, url, emitter)
      return feeds[key]
    },
    // Receives a data object with name and url and stops tracking it.
    stopFeed: function ({ name, url }) {
      const key = createFeedKey(name, url)
      if (feeds[key]) {
        clearTimeout(feeds[key].timer)
        delete feeds[key]
      }
    },
    // poll a feed one time
    poll: async function ({ name, url }) {
      return pollFeed(name, url, emitter)
    }
  }
  // start
  Object.values(data).map((value) => client.startFeed(value))
  return client
}
// creates a timer for a feed  which runs every fixedTimer milliseconds
async function start (name, url, emitter) {
  const fixedTimer = 10 * 1000 // 10 seconds

  async function timerHandler () {
    await pollFeed(name, url, emitter)
    startData.timer = setTimeout(timerHandler, fixedTimer)
  }

  const startData = {
    name,
    url,
    timer: setTimeout(timerHandler, 0)
  }
  return startData
}
// using the RSSParser package parsed a specific feed.
async function pollFeed (name, url, emitter) {
  const feedUrl = `https://cors-anywhere.herokuapp.com/${url}` // hack to avoid cors problem
  const parser = new window.RSSParser()
  const feed = await parser.parseURL(feedUrl)
  feed.name = name
  feed.url = url
  emitter.dispatchEvent(createEvent(eventRssItems, feed))
  return feed
}
```

The main point to notice in this component is the inversion of control, main dependencies of the client are received in the factory function. I've also used a setTimeout function which calls it's self as the main timer for the polling the feed. It happens here every 10s just to make things easier to debug.

Issues encountered writing this blog post
-----------------------------
1. customElements.define is global. Like mentioned earlier
2. not so simple to reuse.
3. es6 modules .js files


