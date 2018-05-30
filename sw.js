importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('minesweeper').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/controller.js',
        '/minesweeper.js',
        '/render.js',
        '/style.css',
        '/sw',
        '/images/bomb.svg',
        '/images/flag.svg'
      ]);
    })
  );
});