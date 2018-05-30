console.log('WORKER: leidis');

var version = 'v1::';

var offlineFundamentals = [
    'javascript.js',
    'index.html',
    'lib/vue.js',
    'lib/vuex.js',
    'lib/bootstrap.min.css',
    'styles.css'
];

self.addEventListener("install", function(event) {
    console.log('WORKER: installimine algas.');

    event.waitUntil(
        caches
            .open(version + 'fundamentals')
            .then(function(cache) {
                return cache.addAll(offlineFundamentals);
            })
            .then(function() {
                console.log('WORKER: töötab');
            })
    );
});

self.addEventListener("fetch", function(event) {
    console.log('WORKER: fetch algab');

    if (event.request.method !== 'GET') {
        console.log('WORKER: fetch ignored', event.request.method, event.request.url);
        return;
    }
    event.respondWith(
        caches
            .match(event.request)
            .then(function(cached) {
                var networked = fetch(event.request)
                    .then(fetchedFromNetwork, unableToResolve)
                    .catch(unableToResolve);

                console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
                return cached || networked;

                function fetchedFromNetwork(response) {

                    var cacheCopy = response.clone();

                    console.log('WORKER: fetch response from network.', event.request.url);

                    caches
                        .open(version + 'fundamentals')
                        .then(function add(cache) {

                            return cache.put(event.request, cacheCopy);
                        })
                        .then(function() {
                            console.log('WORKER: fetch response stored in cache.', event.request.url);
                        });

                    return response;
                }

                function unableToResolve () {
                    console.log('WORKER: fetch request failed in both cache and network.');

                    return new Response('<h1>Service Unavailable</h1>', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/html'
                        })
                    });
                }
            })
    );
});

self.addEventListener("activate", function(event) {
    console.log('WORKER: activate event in progress.');

    event.waitUntil(
        caches
            .keys()
            .then(function (keys) {
                return Promise.all(
                    keys
                        .filter(function (key) {
                            return !key.startsWith(version);
                        })
                        .map(function (key) {
                            return caches.delete(key);
                        })
                );
            })
            .then(function() {
                console.log('WORKER: activate completed.');
            })
    );
});