// service worker
const CACHE_NAME = 'sayings-v1'
const urlsToCache = [
  'https://www.tlu.ee/~ttaevik/dice/script.js',
  'https://www.tlu.ee/~ttaevik/dice/index.html',
  'https://www.tlu.ee/~ttaevik/dice/style.css',
  'https://www.tlu.ee/~ttaevik/dice/',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://www.tlu.ee/~ttaevik/dice/dicepildid/dice6.png',
  'https://www.tlu.ee/~ttaevik/dice/dicepildid/dice5.png',
  'https://www.tlu.ee/~ttaevik/dice/dicepildid/dice4.png',
  'https://www.tlu.ee/~ttaevik/dice/dicepildid/dice3.png',
  'https://www.tlu.ee/~ttaevik/dice/dicepildid/dice2.png',
  'https://www.tlu.ee/~ttaevik/dice/dicepildid/dice1.png',
  'https://www.tlu.ee/~ttaevik/dice/dicepildid/dice7.png',
  'https://www.tlu.ee/~ttaevik/dice/manifest.json'
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
