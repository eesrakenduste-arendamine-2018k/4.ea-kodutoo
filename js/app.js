let timer = 0;
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
        this.newword = []
        this.scrambledWord = ""
        this.score = 0
        this.init()
		this.timer = 0
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
		
			
		
        compareAnswer: function () {
            var userAnswer = document.querySelector('#ex2').value
            if (userAnswer.toString() === Sayings.word.toString()) {
                document.querySelector('#ex2').value = ""
                this.score++
                document.querySelector('#score').innerHTML = this.score
                app.generateRandomWord()
            } else {
                document.querySelector('#ex2').value =""
                if(this.score> 0){
                    this.score--
                    document.querySelector('#score').innerHTML = this.score
                } else{
                    this.score = 0
                    document.querySelector('#score').innerHTML = this.score
                }
                app.generateRandomWord()
            }
        },
	

	
        generateRandomWord: function () {
            Sayings.word = Sayings.words[Math.floor(Math.random() * Sayings.words.length)]
            document.querySelector('#test').innerHTML = Sayings.scrambledWord
            Sayings.word = Sayings.word.replace("\r", "")
            var array = Sayings.word.split("")


            var j, x, i
            for (let i = 0; i < array.length; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            Sayings.scrambledWord = ""
            for (let i = array.length - 1; i >= 0; i--) {
                Sayings.scrambledWord = Sayings.scrambledWord + array[i]

            }
            document.querySelector('#test').innerHTML = Sayings.scrambledWord
            console.log(Sayings.word)
        }
    } // Sayings LÕPP

    // kui leht laetud käivitan rakenduse
    window.onload = function () {
        const app = new Sayings()
        window.app = app
        app.generateRandomWord()
		var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
		startTimer(fiveMinutes, display);
		
		
		function startTimer(duration, display) {
			var start = Date.now(),
			diff,
			minutes,
			seconds;
			function timer() {

				diff = duration - (((Date.now() - start) / 1000) | 0);
				minutes = (diff / 60) | 0;
				seconds = (diff % 60) | 0;

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				display.textContent = minutes + ":" + seconds; 

			if (diff <= 0) {
				start = Date.now() + 1000;
				this.score = 0
                document.querySelector('#score').innerHTML = this.score
				


			}
		};
		timer();
		setInterval(timer, 1000);
		}
    }

	
	
})()
