Prototyping with Web Components - RSS Reader - part (1). (events, client, store, elements)
---------------------------------------------------------------------------------------
We are about to embark on an exploration journey, down the path of prototyping an application using web components, es6 modules, event target and what not. In this blog post series I plan to introduce to you this vibrant web standard in a way of joined discovery where we will learn together how to use web components together and explore some additional goodies I wanted to place my hand for a while now.

RSS-Reader - this is so 2006 (5,4,3) ?
=====================================
TODO: enter gif
When considering the example we would explore, a todo app came to mind. Yes, it is a great example done many times over. It has become some what of the "hello world" for any UI based technology in the Javascript space. Yet, I felt not only it's been explored it lack the meat sort to speak, of a real world app would have. I wanted to create a concise enough example to discuss freely over blog posts, and a broad enough to provide real value. Hence our friendly RSS reader came to mind. So without further ado here is the project.

You can can find the source code of the project in this [repository](https://github.com/qballer/rss-reader). I encourage you to find my code smells, and offer pull requests which will improve this guide. The highlights would be mentions in future blog post about this application. This is a joined exploration, like I said and any contribution is welcomed.

Some general design decision:
1. Lit-element - this project is using the fine work of lit-html and lit-element by the polymer team. It seems like a great library to work with on top the web component standard which takes away a lot of boilerplate pain.
2. Bundle free (almost) - Whishing to explore some more new features of the web, this project utilize es6 modules heavily. This is but with one exception to the rule, the RSS parser by (todo: enter link) is a normal browser package.
3. Browser only - this project doesn't have a backend because I feel Server Side Rendering is a topic for a different post which will contain SSR.
4. All modules are made available on the [bit.dev](https://bit.dev) component hub for future reuse. The bit platform (which is my full time job) is one of the best ways to share JS components in general and web components specifically.
5. This project uses timers and `eventTarget` heavily instead of workers as these don't fully support es6 modules (yet? TODO: enter FF/Chrome issues). When those reach to full working state, I would be more than happy refactor.

Project Structure
==================
1. index.html - as the main layout of the project.
2. define-elements.js - escape web components global
3. elements folder - containing lit-element web components:
   1. item-list.js - the feed item list rendering the current selected feed.
   2. nav-bar.js - edit feeds and consume them.
   3. rss-item.js/nav-item - representing a single fragment inside their respective lists.
4. rss folder
   1. events.js - containg all event names and event utiltiy functions used in the project.
   2. feed-key - function for creating a uniqe feed key in the store.
   3. rss-client - get and parse rss feeds.
   4. rss-store - the application main state.
5. utils folder
   1. defer-function used to make dispatch events async.

some issues on web components
-----------------------------
1. lit element static html rendering - unsafeHtml
2. customElements.define is global
3.


