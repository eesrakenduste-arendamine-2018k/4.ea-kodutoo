(function () {
    'use strict'

    const Sayings = function () {
        // SEE ON SINGLETON PATTERN
        if (Sayings.instance) {
            return Sayings.instance
        }
        Sayings.instance = this

        this.new = true
        this.words = []
        this.word = ""
        this.init()
    }

    window.Sayings = Sayings // Paneme muuutuja külge

    Sayings.prototype = {
        init: function () {

            // service workeri käivitus
            this.registerServiceWorker()
            this.readTextFromFile()
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
        },
        readTextFromFile: function () {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", '/~meintaav/offline-app/js/lemmad2013.txt', false)
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText
                        Sayings.words = allText.split("\n");
                        Sayings.word = Sayings.words[Math.floor(Math.random() * Sayings.words.length)]
                    }
                }
            }
            rawFile.send(null);
        },
        generateRandomWord: function(){
            Sayings.word = Sayings.words[Math.floor(Math.random() * Sayings.words.length)]
            document.querySelector('#test').innerHTML = Sayings.word
        }

    } // Sayings LÕPP

    // kui leht laetud käivitan rakenduse
    window.onload = function () {
        const app = new Sayings()
        window.app = app
        document.querySelector('#test').innerHTML = Sayings.word
    }
})()