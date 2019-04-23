export function createStore() {
    const data = loadStore()
    return  {
        addChannel: function (info) {},
        getHistory: function (channelId) {},
        addToHistory: function (items) {},
    }
}

export function loadStore() { 
    return {
        channels: [{
            name: 'ECHO.js',
            url: 'https://echojs.com/rss',
            items: 10,
            history: []
        }],
    }
}
