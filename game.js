document.getElementById("newGame").style.display="none";
	this.init()

window.onload = function firstCard(){
	var card = "kaarditagune.png";
	var displayBack = "<img src='" + card + "' width='186' height='270'/>";
	document.getElementById("result").innerHTML = displayBack;
	}
function displayImage(){
	var pildid = ["images/artu2.png", "images/artu3.png", "images/artu4.png", "images/artu5.png", "images/artu6.png", "images/artu7.png", "images/artu8.png", "images/artu9.png", "images/artu10.png", "images/artupoiss.png", "images/artuemand.png", "images/artukunn.png", "images/artuass.png", "images/poti2.png", "images/poti3.png", "images/poti4.png", "images/poti5.png", "images/poti6.png", "images/poti7.png", "images/poti8.png", "images/poti9.png", "images/poti10.png", "images/potipoiss.png", "images/potiemand.png", "images/potikunn.png", "images/potiass.png", "images/ruutu2.png", "images/ruutu3.png", "images/ruutu4.png", "images/ruutu5.png", "images/ruutu6.png", "images/ruutu7.png", "images/ruutu8.png", "images/ruutu9.png", "images/ruutu10.png", "images/ruutupoiss.png", "images/ruutuemand.png", "images/ruutukunn.png", "images/ruutuass.png", "images/risti2.png", "images/risti3.png", "images/risti4.png", "images/risti5.png", "images/risti6.png", "images/risti7.png", "images/risti8.png", "images/risti9.png", "images/risti10.png", "images/ristipoiss.png", "images/ristiemand.png", "images/ristikunn.png", "images/ristiass.png"];

	var item = pildid[Math.floor(Math.random()*pildid.length)];
	var displayPic = "<img src='" + item + "' width='186' height='270'/>";
	document.getElementById("result").innerHTML = displayPic;

	}
	var score1 = 26
	
	document.getElementById("addPic").addEventListener("click", addCard);

	function addCard() {
    document.getElementById("score").innerHTML = score1 += 1;
	if (score1 == 52){
		document.getElementById("score").innerHTML = "Mäng on läbi! Sa võitsid";
		document.getElementById("addPic").style.display = "none";
		document.getElementById("removePic").style.display = "none";
		document.getElementById("newPic").style.display = "none";
		document.getElementById("newGame").style.display="inline";
		document.getElementById("result").style.display="none";
	}
}
	document.getElementById("removePic").addEventListener("click", removeCard);

	function removeCard() {
    document.getElementById("score").innerHTML = score1 -= 1;
	if (score1 == 0){
		document.getElementById("score").innerHTML = "Mäng on läbi! Sa kaotasid";
		document.getElementById("addPic").style.display = "none";
		document.getElementById("removePic").style.display = "none";
		document.getElementById("newPic").style.display = "none";
		document.getElementById("newGame").style.display="inline";
		document.getElementById("result").style.display="none";
}
	
}
function startNewGame(){
	location.reload();
}
function init() {
	window.addEventListener('devicemotion', this.triggerMotion.bind(this))
	}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function triggerMotion (event) {
      const xGravity = event.accelerationIncludingGravity.x
	  const test = true;
	  
      if ((xGravity + xGravity + xGravity)/3 > 10) {
        this.displayImage()
		sleep(500)
		
	  }
    }

	
	//Register service worker
	  function registerServiceWorker () {
      if ('serviceWorker' in navigator) {
		  window.addEventListener('load', function() {
			navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
			  // Registration was successful
			  console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}, function(err) {
			  // registration failed :(
			  console.log('ServiceWorker registration failed: ', err);
			});
		  });
		}
    }
	
	registerServiceWorker();
