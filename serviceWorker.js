const CACHE_NAME = 'js_pong'
const cachedUrls = [
  '/4.ea-kodutoo/',
  '/4.ea-kodutoo/index.html',
  '/4.ea-kodutoo/game.js',
  '/4.ea-kodutoo/pong.js',
  '/4.ea-kodutoo/pong.css',
  '/4.ea-kodutoo/images/press1.png',
  '/4.ea-kodutoo/images/press2.png',
  '/4.ea-kodutoo/images/winner.png',
  '/4.ea-kodutoo/sounds/goal.wav',
  '/4.ea-kodutoo/sounds/ping.wav',
  '/4.ea-kodutoo/sounds/pong.wav',
  '/4.ea-kodutoo/sounds/wall.wav'
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('cache opened')
        return cache.addAll(cachedUrls)
      })
  )
})
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') { }
  event.respondWith(
    caches
      .match(event.request)
      .then(function (cached) {
        const networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve)
        console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url)
        return cached || networked
        function fetchedFromNetwork (response) {
          const cacheCopy = response.clone()
          console.log('WORKER: fetch response from network', event.request.url)
          caches
            .open(version + 'pages')
            .then(function add (cache) {
              cache.put(event.request, cacheCopy)
            })
            .then(function () {
              console.log('WORKER: fetch response stored in cache.', event.request.url)
            })
          return response
        }
        function unableToResolve () {
          console.log('WORKER: fetch request failed in both cache and network.', event.request.url)
          return new Response('<h1>Service unavailable</h1>', {
            status: 503,
            statusText: 'Service unavailable',
            headers: new Headers({
              'Content-Type': 'text-html'
            })
          })
        }
      })
  )
})
