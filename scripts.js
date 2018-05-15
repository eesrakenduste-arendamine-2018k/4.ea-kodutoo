(function () {
  'use strict'

  const Sayings = function () {
    // SEE ON SINGLETON PATTERN
    if (Sayings.instance) {
      return Sayings.instance
    }
    Sayings.instance = this

    this.new = true
    this.sayingsList = []

    this.init()
  }

  window.Sayings = Sayings // Paneme muuutuja külge

  Sayings.prototype = {
    init: function () {
      console.log('Sayings started')

      // service workeri käivitus
      this.registerServiceWorker()

      // laeme vanasõnad failist
      this.getSayings()

      // kuulame seadme liigutamist
      window.addEventListener('devicemotion', this.triggerMotion.bind(this))
    },

    triggerMotion: function (event) {
      // console.log(event);
      const xGravity = event.accelerationIncludingGravity.x

      // kui liikumine suurem, siis laeme uue ja ootame 1s enne kui uuesti
      if (xGravity > 10 && this.new) {
        this.writeRandomSaying()
        navigator.vibrate(300)

        this.new = false

        window.setTimeout(function () {
          Sayings.instance.new = true
        }, 1000)
      }
    },

    getSayings: function () {
      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log('got json from file')
          Sayings.instance.sayingsList = JSON.parse(this.responseText).sayings

          Sayings.instance.writeRandomSaying()
        }
      }
      xhttp.open('GET', 'sayings.json', true)
      xhttp.send()
    },

    writeRandomSaying: function () {
      // leia random indeksiga vanasona
      const randomSaying = this.sayingsList[parseInt(Math.random() * this.sayingsList.length)]
      document.querySelector('#content').innerHTML = randomSaying
    },

    registerServiceWorker: function () {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
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
