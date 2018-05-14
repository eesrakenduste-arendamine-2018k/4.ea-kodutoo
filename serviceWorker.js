// service worker
const CACHE_NAME = 'sayings-v1'
const urlsToCache = [
  '/~valerivv/sayings-offline-app/sayings.json',
  '/~valerivv/sayings-offline-app/scripts.js',
  '/~valerivv/sayings-offline-app/index.html',
  '/~valerivv/sayings-offline-app/',
  '/~valerivv/sayings-offline-app/styles.css',
  '/~valerivv/sayings-offline-app/dicepic',
  '/~valerivv/sayings-offline-app/dicepic/Dice-1.png',
  '/~valerivv/sayings-offline-app/dicepic/Dice-2.png',
  '/~valerivv/sayings-offline-app/dicepic/Dice-3.png',
  '/~valerivv/sayings-offline-app/dicepic/Dice-4.png',
  '/~valerivv/sayings-offline-app/dicepic/Dice-5.png',
  '/~valerivv/sayings-offline-app/dicepic/Dice-6.png'
]

self.addEventListener('install', function (event) {
  // Perform install steps

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache')

        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function (event) {
  // console.log('WORKER: fetch event in progress.');

  if (event.request.method !== 'GET') { return }
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
          console.log('WORKER: fetch response from network.', event.request.url)
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
