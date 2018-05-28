var cacheName = 'v1'
var cacheFiles = [
    './',
    './index.html',
    './index.js',
    './style.css'
]

self.addEventListener('install', function(e) {
    console.log("serviceworker installed")

    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("servicewroker chaching cachefiles")
            return cache.addAll(cacheFiles)
        })
    )
})

self.addEventListener('activate', function(e) {

    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log("serviceworker removing cached files from somewhere")
                    return caches.delete(thisCacheName)
                }
            }))
        })
    )
    console.log("serviceworker activated")
})

self.addEventListener('fetch', function(e) {
    console.log("serviceworker fetching", e.request.url)
})