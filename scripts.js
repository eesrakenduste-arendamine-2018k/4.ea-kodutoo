(function () {
  'use strict'
  const rollDice = function () {
      // SEE ON SINGLETON PATTERN
      if (rollDice.instance) {
        return rollDice.instance
      }
      rollDice.instance = this

      this.new = true

      this.init()
    }
  window.rollDice = rollDice // Paneme muuutuja külge

  rollDice.prototype = {
    init: function () {
      console.log('Dice started')

      // service workeri käivitus
      this.registerServiceWorker()

      // kuulame seadme liigutamist
      window.addEventListener('devicemotion', this.triggerMotion.bind(this))
    },

    triggerMotion: function (event) {
      // console.log(event);
      const xGravity = event.accelerationIncludingGravity.x

      // kui liikumine suurem, siis laeme uue ja ootame 1s enne kui uuesti
      if (xGravity > 35 && this.new) {
        this.rollDice()
        navigator.vibrate(300)

        this.new = false
        window.setTimeout(function () {
          Dice.instance.new = true
        }, 1000)
      }
    },
    rollDice: function (){
          const diceSide1 = document.getElementById( 'dice-side-1' );
          const diceSide2 = document.getElementById( 'dice-side-2' );
          const status = document.getElementById( 'status' );

          const side1 = Math.floor( Math.random() * 6 ) + 1;
          const side2 = Math.floor( Math.random() * 6 ) + 1;
          const diceTotal = side1 + side2;
			
		  //tagastab esimese täringu vastuse ja eraldi real teise täringu oma	
          //diceSide1.innerHTML = side1;
          //diceSide2.innerHTML = side2;
          status.innerHTML = 'Täringute summa on ' + diceTotal + '.';

          document.getElementById("pic1").src = "dicepic/Dice-" + side1 + ".png";
          document.getElementById("pic2").src = "dicepic/Dice-" + side2 + ".png";
          document.querySelector('status').innerHTML = diceTotal;
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
  } // Dice LÕPP

  // kui leht laetud käivitan rakenduse
  window.onload = function () {
    const app = new rollDice()
    window.app = app
  }
})()


