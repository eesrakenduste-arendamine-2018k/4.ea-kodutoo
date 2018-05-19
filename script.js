let canvas;
let ctx;
let recW = 150;
let recH = 150;
let x;
let x1;
let y;
let y1;
let speedX;
let speedY;
let hits = 0;
let misses = 0;
let rect;
let xmin;
let xmax;
let ymin;
let ymax;


window.onload = function(){
	
	registerServiceWorker();
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	x = canvas.width/2;
	y = canvas.height/2;
	speedX = 1;
	speedY = 1+Math.random()*2;
	drawSquare();


}

function registerServiceWorker(){
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

function drawSquare(){

	canvas.width = canvas.width;
	ctx.fillRect(x-recW / 2, y-recH / 2, recW, recH);
	x+= speedX;
	y+= speedY;
	if(x <=recW / 2){
		x=canvas.width - recW / 2
	}else if(x>= canvas.width - recW / 2){
		x=recW/2
	}

	if(y <=recH / 2 || y>= canvas.height - recH / 2){
		speedY *= -1;
	}

	canvas.onmousedown = function(e){
		rect = canvas.getBoundingClientRect();
		x1 = e.clientX -rect.left;
		y1 = e.clientY -rect.top;


		
		if(x1<xmax && x1>xmin && y1<ymax && y1>ymin ){
			hits+=1;
			document.getElementById("hits").innerHTML = "Pihta saamise skoor: "+hits;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			x = Math.random()*800;
			y = Math.random()*800;
			speedX+= 1;
			if(speedY<0){
				speedY-= (1+Math.random()*2); 
			}else if(speedY>0){
				speedY+=1+Math.random()*2;
			}
		}else{
			misses+=1;
			document.getElementById("misses").innerHTML = "Mitu korda oled mööda vajutanud: "+misses;
		}
	}


	xmin = x-100;
	xmax = x+100;
	ymin = y-100;
	ymax = y+100;

	requestAnimationFrame(drawSquare);
	

}
