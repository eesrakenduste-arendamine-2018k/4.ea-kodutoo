 function shake(event) {
                  const xGravity = event.accelerationIncludingGravity.x
                    document.getElementById("testObj").innerHTML = xGravity
                  
                  if (xGravity > 10) {
                    
                    //navigator.vibrate(300)
                    document.getElementById("testObj").innerHTML = "works";
                  
                  }
                
            }
            window.addEventListener('devicemotion', shake.bind(this))


function startGame() {
	document.getElementById("play").style.display = "none";
	document.getElementById("readme").style.display = "none";
}