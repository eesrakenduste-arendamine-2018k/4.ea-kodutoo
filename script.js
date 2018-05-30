(function () {
  'use strict'

  const Dares = function () {
    // SEE ON SINGLETON PATTERN
    if (Dares.instance) {
      return Dares.instance
    }
    Dares.instance = this

    this.new = true
    this.daresList = []

    this.init()
  }

  window.Dares = Dares // Paneme muuutuja külge

  Dares.prototype = {
    init: function () {
      console.log('Dares started')

      this.registerServiceWorker()

      this.getDares()

      window.addEventListener('devicemotion', this.triggerMotion.bind(this))
    },

    /*triggerMotion: function (event) {
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
    },*/

    getDares: function () {
      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log('got json from file')
          Dares.instance.daresList = JSON.parse(this.responseText).dares

          Dares.instance.writeRandomDare()
        }
      }
      xhttp.open('GET', 'dares.json', true)
      xhttp.send()
    },

    writeRandomDare: function () {
      const randomDare = this.daresList[parseInt(Math.random() * this.daresList.length)]
      document.querySelector('#content').innerHTML = randomDare
    },
  }

  window.onload = function () {
    const app = new Dares()
    window.app = app
  }
})()