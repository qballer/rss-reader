Prototyping with Web Components - RSS Reader - part (1). (events, client, store, elements)
---------------------------------------------------------------------------------------
We are about to embark on an exploration journey, down the path of prototyping an application using web components, es6 modules, event target, bit cli and what not. In this blog post series I plan to introduce to you this vibrant web standard called Web Components in a way of joined discovery. Here, we will learn together how to use web components and explore some additional goodies. By all means I'm no expert in the field and would love to see inputs from the community on how this work can and should improve.

Web Components - Why ?
-----------------------------
 The main focus of the series is web components and before we dive in I would like to stop and talk about why you would choose web components as your UI strategy. There are a few reasons:

 1. Future proofing - They used to call it javascript fatigue, but that term has fallen out of grace. Now, sometimes I hear people speak in the terms of future proofing. One of the main reasons to go down this road is that these UI components are a standard, and supported by the browser. In the short history of the web, choosing the standard has proven useful. Developers remember this.

 2. Framework agnostic - What do you do when you have several teams, working on a big application with a few libraries like vue and react. Some times you would like the same functionality across all those libraries and this feat is hard to reach. Sometimes you have multiple teams on different versions of react which require the same component.

 3. Reusable design system - Another perspective for framework agnostic components is when you need to create a design system for your team. Web components seems like the most sane way to achieve that.

 4. Bundle size, why should I ship something which the browser can already do. VDOM rendering is and was mind blowing concept, but this can achieve much more. Now don't get me wrong, react is more mature and ready in terms of API usage and supporting echo system, but sometimes size really matters.

What are web components ?
---------------------------
In it's core, web components allow you to develop an encapsulated component from the rest of the document. A vanilla way to do things. This document isn't meant to be a full blown guide to the web components API, there are many others [TODO: insert links]. Never the less this is is the main offering of web components:

1. Custom Element - Javascript API which allows you to define a new kind of html tag, specific to your component collection.

2. HTML templates - introduction the `<template>` and `<slot>` tags a you can specify the layout of the template.

3. Shadow DOM - or as I call it, the "mini dom" which is specific to your component. Some kind of an isolated environment for your component DOM, separated from the rest of the document.

These 3 API's together allow you to encapsulate the functionality of a component and isolate it from the rest of the APP in ease.
It also allows you to essentially extend your DOM api with additional tags.

How does lit element work ?
-----------------------------
Lit is an abstraction on top of the low level vanilla api

RSS-Reader - this is so 2006 (5,4,3) ?
-----------------------------
When considering the example we would explore, a todo app came to mind. Yes, it is a great example done many times over. It has become some what of the "hello world" for any UI based technology. Yet, I felt not only it's been explored and lacks the meat sort to speak of a real world app. I wanted to create a concise enough example to discuss freely over blog posts, and a broad enough to provide real value. Hence our friendly RSS reader came to mind. So without further ado here is the project.

You can can find the source code of the project in this [repository](https://github.com/qballer/rss-reader). I encourage you to find my code smells, and offer pull requests, which will improve this guide. The highlights would be mentions in future blog post about this application. like I mentioned earlier this is a joined exploration, and any contributions are welcomed.

Some general design decision:
1. Lit-element - this project is using the fine work of lit-html and lit-element by the polymer team. It seems like a great library to work with on top the web component standard which takes away a lot of boilerplate pain. Its important to note that lit was heavily inspired by [hyper](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api) another great library worth exploring.
2. Bundle free (almost) - Whishing to explore some more new features of the web, this project utilize es6 modules heavily. This is but with one exception to the rule, the RSS parser by (todo: enter link) is a "normal" browser package.
3. Browser only - this project doesn't have a backend component because I feel Server Side Rendering is a topic for a different post which will go in more details.
4. All modules are made available on the [bit.dev](https://bit.dev) component platform for future reuse. The bit cli and and platform (which is my full time job) is one of the best ways to share JS components in general and web components specifically. It also has the great benefit of encouraging modularity.
5. This project uses timers and `eventTarget` heavily instead of workers. Workers don't play well with es6 modules (yet? TODO: enter FF/Chrome issues). When those reach to full working state, I would be more than happy refactor.
6. This repos is in the prototyping phase and so it doesn't contain tests. I believe in tests, and will insert them in the future. This may go against TDD but I feel wouldn't contribute to the learning process currently. When it would be added I will share the refactoring needed to introduce tests.


Project Structure - taking modulraity to heart.
-----------------------------
1. `index.html` - as the main layout of the project.
2. `reader.js` - the main javascript file of the project, setting up event emitters.
3. elements folder - containing lit-element web components:
   1. `item-list.js` - the feed item list rendering the current selected feed.
   2. `nav-bar.js` - edit feeds and consume them.
   3. `rss-item.js/nav-item.js` - representing a single fragment inside their respective lists.
4. rss folder
   1. `events.js` - containing all event names and event creation function.
   2. `feed-key.js` - function for creating a uniqe feed key in the store.
   3. `rss-client.js` - get and parse rss feeds.
   4. `rss-store` - the application main state.
5. utils folder
   1. `defer-function.js` used to make dispatch events async.
   2. `define-elements.js` - escape web components global as much as possibile.



Highlights from the Reader
-------------------------

some issues on web components
-----------------------------
1. lit element static html rendering - unsafeHtml
2. customElements.define is global.
3. not so simple to reuse.


todo: add
