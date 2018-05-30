 
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceworker.js').then(function (registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful: ', registration)
        }, function (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err)
        })
      }
 
 var score= 0;
 var gameTime = 0;
 function shake(event) {
                  const xGravity = event.accelerationIncludingGravity.x
                  
                  if (xGravity > 10) {
                    score += xGravity-10;
                    //navigator.vibrate(300)
                    document.getElementById("scoretest").innerHTML = "Progress: "+Math.floor((100*score)/1000)+"%";
					if (score>=1000) {
						//mang läbi
						document.getElementById("scoretest").style.display = "none";
						
						document.getElementById("endscreen").style.display = "block";
						document.getElementById("score").innerHTML = "Time: "+gameTime/10 +"s";
						document.body.style.backgroundColor = "#98FB98";
					}
                  }
                
}
            

function startGame() {
	document.getElementById("play").style.display = "none";
	document.getElementById("readme").style.display = "none";
	document.getElementById("scoretest").style.display = "block";
	window.addEventListener('devicemotion', shake.bind(this))
	var myVar = setInterval(function(){gameTime+=1;}, 100);
}

function newGame(){
	location.reload();
}