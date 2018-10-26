// service worker
const CACHE_NAME = 'runescape_inventory_v1'
const urlsToCache = [
    '/~sizen/runescape-inventory-offline/scripts/app.js',
    '/~sizen/runescape-inventory-offline/scripts/bank.js',
    '/~sizen/runescape-inventory-offline/scripts/inventory.js',
    '/~sizen/runescape-inventory-offline/scripts/items.js',
    '/~sizen/runescape-inventory-offline/img/air_rune.png',
    '/~sizen/runescape-inventory-offline/img/bank.png',
    '/~sizen/runescape-inventory-offline/img/experimental_inventory.png',
    '/~sizen/runescape-inventory-offline/img/lobster.png',
    '/~sizen/runescape-inventory-offline/img/logs.png',
    '/~sizen/runescape-inventory-offline/img/rune_scimitar.png',
    '/~sizen/runescape-inventory-offline/img/saradomin_brew.png',
    '/~sizen/runescape-inventory-offline/img/shark.png',
    '/~sizen/runescape-inventory-offline/index.html',
    '/~sizen/runescape-inventory-offline/',
    '/~sizen/runescape-inventory-offline/style.css'
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