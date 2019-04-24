ReadRSS
-------
An RSS client leveraging web components and the bit CLI.
All components are meant to be sharable and utilize the bit cli platform to leverage that.

Why ?
----
For a while now I've been wanting to build an RSS reader which is pure browser and isn't an extension. I've combined this desire with the exploration of a few browser based API and concepts detailed bellow and came up with this. You can use this as a client and as a learning experience as I plan to document all of this in the docs and on medium.

RSS Blog Series
---------------
1. Prototyping Web Components - RSS overview - part (1). (events, client, store, elements)
2. Server side rendering with web components - part (2). (lit-html-server)
3. Reusable .js files with ES6 modules - part (3). (worker issues, timers alternative)
4. Testing components with mocha and puppeteer - part (4). (investigate page model pattern)
5. LRU Caching component, resolve duplicate results - part (5). (array and object principle)
6. Re-implement in svelte.js - part (6) (compiler princple vs html parsers)

Structure:
1. Docs - containing blog post on t he topics above.
2. Assets - Images etc.
3. Source - containing all components, utilities required to run the app.
4. tests - component testing shared via puppeteer.

Tests
-----
```bash
# npm run test - when tests part are ready.
```

