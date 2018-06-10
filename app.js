// Abimaterjal: http://www.competa.com/blog/how-to-build-a-snake-game-using-javascript-and-html5-canvas/
// Favicon: https://www.stationjack.com/category/retro/page/15/

(function () {
    window.onload = function () {
        // Canvas
        const myCanvas = document.getElementById('canvas')
        const ctx = myCanvas.getContext('2d')
        const w = (window.innerWidth > 0) ? window.innerWidth : screen.width
        const h = (window.innerHeight > 0) ? window.innerHeight : screen.height
        myCanvas.height = h 
        myCanvas.width = w
        
        const cw = 10
        let direction
        let food
        let score
        let level
        let tail
        let snake_array // massiiv ussi tükkide asukoha hoidmiseks
        let xDown = null
        let yDown = null
        const tiltBtn = document.getElementById('tilt')
        const swipeBtn = document.getElementById('swipe')
        const startBtn = document.getElementById('btn')

        swipeBtn.style.backgroundColor = "gray"
        swipeBtn.value = "1"
        tiltBtn.value = "0"

        startBtn.addEventListener('click', function () {
            init()
        })

        swipeBtn.addEventListener('click', function () {
            swipeBtn.style.backgroundColor = "gray"
            tiltBtn.style.backgroundColor = "black"
            tiltBtn.value = "0"
            swipeBtn.value = "1"
        })
        
        tiltBtn.addEventListener('click', function () {
            tiltBtn.style.backgroundColor = "gray"
            swipeBtn.style.backgroundColor = "black"
            tiltBtn.value = "1"
            swipeBtn.value = "0"
            
        }) 

        function init () {
            direction = 'right' // vaikeväärtusega suund
            snake_array = []
            create_snake()
            create_food()
            score = 0
            registerServiceWorker()
        
            if (typeof game_loop != 'undefined') {
                clearInterval(game_loop)
            }
            game_loop = setInterval(paint, 100)
        }
        
        function create_snake () {
            let length = 5 // Algne pikkus
            for (let i = length-1; i >= 0; i--) {
                // Tükid ussi massiivi
                snake_array.push({x:i, y:0})
            }
        }
        
        function create_food () {
            food = {
                x: Math.round(Math.random()*(w-cw)/cw), 
                y: Math.round(Math.random()*(h-cw)/cw), 
            }
        }
        
        function paint () {
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, w, h)
            ctx.strokeStyle = 'black'
            ctx.strokeRect(0, 0, w, h)
            
            btn.setAttribute('disabled', true)

            let nx = snake_array[0].x
            let ny = snake_array[0].y
            if (direction == 'right') {
                nx++
            } else if (direction == 'left') {
                nx--
            } else if (direction === 'up') {
                ny--
            } else if (direction === 'down') {
                ny++
            }

            // Kokkupõrke korral seiskumine
            if (nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array)) {
                // Restart
                ctx.clearRect(0, 0, w, h)
                game_loop = clearInterval(game_loop)
                btn.removeAttribute('disabled', true)
                return
            }
            
            if (nx == food.x && ny == food.y) {
                tail = {x: nx, y: ny}
                score++		
                create_food()
            } else {
                tail = snake_array.pop()
                tail.x = nx
                tail.y = ny
            }
            
            // Ussi liikumine toimub põhimõttel viimane element esimeseks
            snake_array.unshift(tail)

            // Ussi loomine
            for (let i = 0; i < snake_array.length; i++) {
                let c = snake_array[i]
                paint_cell(c.x, c.y, 'blue')
            }
            
            // Toit
            paint_cell(food.x, food.y, 'red')
            
            // Skoor
            let score_text = "SCORE: " + score
            ctx.fillText(score_text, 5, h-5)
        
        // Objektide loomine
        function paint_cell (x, y, color) {
            ctx.fillStyle = color
            ctx.fillRect(x*cw, y*cw, cw, cw)
            ctx.strokeStyle = 'white'
            ctx.strokeRect(x*cw, y*cw, cw, cw)
        }
        
        function check_collision (x, y, array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].x === x && array[i].y === y) {
                    return true
                }
            return false
            }
        }

        // Liikumise kontroll
        if (swipeBtn.value === "1") {
            window.addEventListener('keydown', function (e) {
            let key = e.which
            if (key == '37' && direction != 'right') {
                direction = 'left'
            } else if (key == '38' && direction != 'down') {
                direction = 'up'
            } else if (key == '39' && direction != 'left') {
                direction = 'right'
            } else if (key == '40' && direction != 'up') {
                direction = 'down'
            }
            })
        } else if (tiltBtn.value === "1") {
            window.addEventListener('devicemotion', function (event) {
                const xGravity = event.accelerationIncludingGravity.x
                const yGravity = event.accelerationIncludingGravity.y
                if (xGravity > -2 && direction != 'right') {
                    direction = 'left'
                }
                if (xGravity < -6 && direction != 'left') {
                    direction = 'right'
                }
                if (yGravity > 6 && direction != 'up') {
                    direction = 'down'
                }
                if (yGravity < 3.8 && direction != 'down') {
                    direction = 'up'
                }
                window.setTimeout(function () {}, 1000)
            })
            }
        }
        
        function registerServiceWorker () {
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

        function handleTouchStart (evt) {                                         
            xDown = evt.touches[0].clientX                                  
            yDown = evt.touches[0].clientY                                      
        }                                        
        
        function handleTouchMove (evt) {
            if (!xDown || !yDown) {
                return
            }
        
            let xUp = evt.touches[0].clientX;                                    
            let yUp = evt.touches[0].clientY;
        
            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;
        
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    /* left swipe */ 
                } else {
                    /* right swipe */
                }                       
            } else {
                if (yDiff > 0) {
                    /* up swipe */ 
                } else { 
                    /* down swipe */
                }                                                                 
            }
            /* reset values */
            xDown = null
            yDown = null                                            
        }
    }
}())