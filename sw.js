var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/controller.js',
    '/minesweeper.js',
    '/render.js',
    '/style.css',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
/*
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('minesweeper').then(function(cache) {
     return cache.addAll([
       '/',
       '/mihkel26.github.io/4.ea-kodutoo/',
       '/mihkel26.github.io/4.ea-kodutoo/index.html',
       '/mihkel26.github.io/4.ea-kodutoo/controller.js',
       '/mihkel26.github.io/4.ea-kodutoo/minesweeper.js',
       '/mihkel26.github.io/4.ea-kodutoo/render.js',
       '/mihkel26.github.io/4.ea-kodutoo/style.css',
       '/mihkel26.github.io/4.ea-kodutoo/images/bomb.svg',
       '/mihkel26.github.io/4.ea-kodutoo/images/flag.svg'
     ]);
   })
 );
});
*/
self.addEventListener('fetch', function (event) {
    // console.log('WORKER: fetch event in progress.');

    if (event.request.method !== 'GET') {
        return
    }
    event.respondWith(
        caches
            .match(event.request)
            .then(function (cached) {
                const networked = fetch(event.request)
                    .then(fetchedFromNetwork, unableToResolve)
                    .catch(unableToResolve)
                console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url)
                return cached || networked

                function fetchedFromNetwork(response) {
                    const cacheCopy = response.clone()
                    console.log('WORKER: fetch response from network.', event.request.url)
                    caches
                        .open(version + 'pages')
                        .then(function add(cache) {
                            cache.put(event.request, cacheCopy)
                        })
                        .then(function () {
                            console.log('WORKER: fetch response stored in cache.', event.request.url)
                        })

                    return response
                }

                function unableToResolve() {
                    console.log('WORKER: fetch request failed in both cache and network.', event.request.url)
                    return new Response('<h1>Service Unavailable</h1>', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/html'
                        })
                    })
                }
            })
    )
})
