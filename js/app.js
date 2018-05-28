(function () {
    'use strict'

    const Sayings = function () {
        // SEE ON SINGLETON PATTERN
        if (Sayings.instance) {
            return Sayings.instance
        }
        Sayings.instance = this

        this.new = true

        this.init()
    }

    window.Sayings = Sayings // Paneme muuutuja külge

    Sayings.prototype = {
        init: function () {
            console.log('Sayings started')

            // service workeri käivitus
            this.registerServiceWorker()
        },

        registerServiceWorker: function () {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('js/offline.js').then(function (registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful: ', registration)
                }, function (err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err)
                })
            }
        }

    } // Sayings LÕPP

    // kui leht laetud käivitan rakenduse
    window.onload = function () {
        const app = new Sayings()
        window.app = app
    }
})()