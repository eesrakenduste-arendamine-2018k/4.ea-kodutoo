var canvas;
var ctx;
var bubbles = [];
var initSize = 40;
var scoreMath = 0;
var textSize = window.innerWidth / 15;
var elud = 3;
var lifeBar = "LIVES: [<3|<3|<3]";
var randomColor = "pink";
var kahanemisKiirus = 0.25;

window.requestAnimFrame = (function() {
 return window.requestAnimationFrame ||
	 window.webkitRequestAnimationFrame ||
	 window.mozRequestAnimationFrame ||
	 window.oRequestAnimationFrame ||
	 window.msRequestAnimationFrame ||
	 function(callback) {
		 window.setTimeout(callback, 1000 / 60);
	 };
})();

window.onload = function(){
	
	console.log("leht leatud");
	
	canvas = document.getElementById("screen");
	ctx = canvas.getContext("2d");
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	//suurus
	canvas.style.width = width;
	canvas.style.height = height;
	
	//reso
	canvas.width = width;
	canvas.height = height;
	
	var my_gradient=ctx.createLinearGradient(0,0,170,0);
	my_gradient.addColorStop(0,"black");
	my_gradient.addColorStop(0.5,"red");
	my_gradient.addColorStop(1,"white");
	ctx.fillStyle=my_gradient;
	ctx.fillRect(20,20,150,100);

	//init
	init();
	
	
	
}


function init() {
	
	getUser();
	
	makeBubble();
	
	makeAnimation();
	
	window.addEventListener("touchstart", function(event){
		console.log(event);
		
		var touchX = event.touches[0].clientX;
		var touchY = event.touches[0].clientY;
		
		for (var i = 0; i < bubbles.length; i++){
			
			var ml = bubbles[i];
			
			var vektori_pikkus = Math.sqrt (Math.pow((ml.x - touchX), 2) +Math.pow((ml.y - touchY), 2));
			if (vektori_pikkus <= ml.suurus) {
				
				//kustutan mulli masiivist
				bubbles.splice(i, 1);

				function random_rgba() {
					var o = Math.round, r = Math.random, s = 255;
					return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
				}
				randomColor = random_rgba();

				kahanemisKiirus += 0.01;
				scoreMath += 10;
				
				var x = 40 + Math.random()*(window.innerWidth - 80);
				var y = 40 + Math.random()*(window.innerHeight - 80);
				makeBubble()
				
				
			} 
			
		}
		
	});
}

function makeBubble(){
	
	var x = 40 + Math.random()*(window.innerWidth - 80);
	var y = 40 + Math.random()*(window.innerHeight - 80);
	
	
	
	var mull = new Mull(x,y);
	
	bubbles.push(mull);
	
}



function makeAnimation(){
  requestAnimFrame(makeAnimation); 
  drawIt();
}

function drawIt() {
	
	// x ja y
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	
	ctx.clearRect(0,0,canvas.width, canvas.height)

	//joonista Mull
	for (var i = 0; i < bubbles.length; i = i + 1){
		
		var ml = bubbles[i];
		
		ml.suurus -= kahanemisKiirus;
		if (ml.suurus <= 0){
			//tegelik kood 
			// if ml.suurus <= 1 siis bubbles.splice(i, 1); makeBubble();
			ml.suurus = initSize;
			bubbles.splice(i,1);
			makeBubble();
			elud = elud - 1;
			if (elud === 0){
				scoreMath = 0;
				setTimeout(function() {
					elud = 3;
					gameOver();
					getUser();}
					,200);
			}
			
			
		}

		ctx.beginPath();
		

		var my_gradient=ctx.createLinearGradient(0,0,canvas.width,0);
		my_gradient.addColorStop(0,"#f7ccf6");
		my_gradient.addColorStop(1,"#336865");
		ctx.fillStyle=my_gradient;
		ctx.fillRect(0,0,canvas.height*2,canvas.width*4);


		ctx.arc(ml.x, ml.y, ml.suurus, 0*Math.PI, 2*Math.PI);
		ctx.fillStyle = randomColor;
		ctx.fill();
		
		
	}
	//SCORE
	ctx.textAlign = "center";
	ctx.font = textSize + "px Courier";
	ctx.fillStyle = "black";

	var scoreText = "score: "+scoreMath;
	ctx.fillText(scoreText, x/1.9, y/1.9);

	//ELUD
	if(elud > 2){
		lifeBar = "LIVES: [<3|<3|<3]";
	} else if (elud > 1){
		lifeBar = "LIVES: [<3|<3| X]";
	} else if (elud > 0){
		lifeBar = "LIVES: [<3| X| X]";
	} else {
		lifeBar = "LIVES: [ X| X| X]";
	}
	ctx.textAlign = "center";
	ctx.font = textSize/2 + "px Courier";
	ctx.fillStyle = "red";

	var scoreText = lifeBar;
	ctx.fillText(scoreText, x/1.9, y/1.6);
	ctx.closePath();
}


function Mull(x, y) {
	
	this.x = x;
	this.y = y;
	this.suurus = 40;
}


function askName() {

	var name = prompt("Mängija nimi");
	return name;
}

function gameOver() {

	return alert("GAME OVER. Try again?");
}

function startGame(){
	
	return alert("Alusta Mängu!");
}

function getUser(){
	
	var oldPlayer = localStorage.getItem("player");
	
	if(oldPlayer){
		var c = confirm("Kas tahad jätkata " + oldPlayer + " ?")
		scoreMath = 0;
		if(c){
			startGame();
		}else{
			var name = askName()
			
			if(!name){
				getUser();
				return;
			}
			localStorage.setItem("player", name);
		startGame();
		}
		
		
	} else {
		
		var name = askName()
			
			if(!name){
				getUser();
				return;
			}
			localStorage.setItem("player", name);
			localStorage.setItem("score", 0);
			
		startGame();
		
	}
	
	
}
