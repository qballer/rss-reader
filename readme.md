rss-reader
-------
An RSS reader leveraging web components and the bit CLI.
All components are meant to be sharable and utilize the [bit](https://github.com/teambit/bit) cli platform to leverage that.

Why ?
----
For a while now I've been wanting to build an RSS reader which is pure browser and isn't an extension. I've combined this desire with the exploration of a few browser based API and concepts detailed bellow and came up with this. You can use this as a client and as a learning experience as I plan to document all of this in the docs and on medium.

RSS Blog Series
---------------
1. Prototyping Web Components - RSS overview - part (1).

(more posts as we go along)

Structure:
1. Docs - containing blog post on t he topics above.
2. Assets - Images etc.
3. Source - containing all components, utilities required to run the app.
4. tests - component testing shared via puppeteer.

Install
------
1. clone the project.
2. ```npm i```
3. ```npm run start```

Tests
-----
```bash
npm run test # only linting, prototype phase.
```

