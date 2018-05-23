const CACHE_NAME = 'js_pong'
const cachedUrls = [
  '/',
  '/index.html',
  '/game.js',
  '/pong.js',
  '/pong.css',
  '/images/press1.png',
  '/images/press2.png',
  '/images/winner.png',
  '/sounds/goal.wav',
  '/sounds/ping.wav',
  '/sounds/pong.wav',
  '/sounds/wall.wav'
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
