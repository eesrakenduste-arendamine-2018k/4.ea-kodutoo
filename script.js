(function () {
  'use strict'

  const Dice = function () {
    // SEE ON SINGLETON PATTERN
    if (Dice.instance) {
      return Dice.instance
    }
    Dice.instance = this

    
    this.new = true
    this.init()
  }

  window.Dice = Dice // Paneme muuutuja külge

  Dice.prototype = {
    init: function () {
      console.log('Dice started')

      // service workeri käivitus
      this.registerServiceWorker()
  
      // kuulame seadme liigutamist
      window.addEventListener('devicemotion', this.triggerMotion.bind(this))
    },

    triggerMotion: function (event) {
      
      const xGravity = event.accelerationIncludingGravity.x
  
      if (xGravity > 15 && this.new) {
        
		    $('.dice').each(function(index){
          throwAnimatedDice( this, index ); 
		    });
		
        navigator.vibrate(100);
        this.new = false

        window.setTimeout(function () {
          Dice.instance.new = true
          navigator.vibrate(300);
        }, 1000)
      }
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
  
  /*function startDice() {
    let counter=0;
    let numbers=[1,2,3,4,5,6]

      function showRandomNumber() {
        if(counter<10) {
          counter++;
          let index = Math.floor(Math.random() * 6)
          let number = numbers[index]
          document.getElementById('placeholder').innerhtml = number
        } else {
          clearInterval();
        }
      }
    setInterval(function() {showRandomNumber()}, 100);
  }*/

function throwAnimatedDice(elem, spins) {
    let value = Math.round(Math.random() * 5) + 1
    displayDice(10 + (spins*5), value, $(elem))
    
    return value
}

function displayDice(times, final, element) {
    element.removeClass()
    if (times > 1) {
        element.addClass('dice dice_' + (Math.round(Math.random() * 5) + 1))
        setTimeout(function () {
            displayDice(times - 1, final, element)
        }, 100)
    } else element.addClass('dice dice_' + final)
}

  // kui leht laetud käivitan rakenduse
  window.onload = function () {
    const app = new Dice()
    window.app = app
  }
})()
