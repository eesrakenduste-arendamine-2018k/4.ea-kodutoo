var answer = '';
"use strict";
function clicked(){
	const width = document.getElementById('horizontal').value;
	const height = document.getElementById('vertical').value;
	const inch = document.getElementById('diagonal').value;
	if(width>0 && height>0 && inch>0){
		answer = precisionRound((Math.sqrt((width*width)+(height*height))/inch),2);	
	}
	else{
		answer = 'Values must be greater than 0';
	}
	document.getElementById('result').innerHTML = answer;
	document.getElementById('result').style.color = "#fff";
	document.getElementById('result').style.filter = "none";
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
}
function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

function getScreenRes(){
	document.getElementById("vertical").defaultValue = screen.availHeight;
	document.getElementById("horizontal").defaultValue =  screen.availWidth;
	document.getElementById("diagonal").defaultValue = 23;
}
function getMore(){
	let width = document.getElementById("horizontal").value;
	let height = document.getElementById("vertical").value;
	let inch = document.getElementById("diagonal").value;
	let aspectRatio = precisionRound(width/height, 4);
	let x = inch/Math.sqrt(((2560*2560)+(1440*1440)));
	let xw = precisionRound(x*width*2.54, 2);
	let xh =  precisionRound(x*height*2.54, 2);;
	let areaCm = precisionRound(xw*xh, 2)+"cm^2";
	let areaPx = width*height+"px^2";
	document.getElementById('ppi').innerHTML = answer+" ppi";
	document.getElementById('inch').innerHTML = inch+'"';
	document.getElementById('resolution').innerHTML = width+"px : "+ height+"px";
	document.getElementById('aspectRatio').innerHTML = aspectRatio+" Ratio";
	document.getElementById('sizeCm').innerHTML = xw+"cm : "+xh+"cm";
	document.getElementById('areaCm').innerHTML = areaCm;
	document.getElementById('areaPx').innerHTML = areaPx;
	document.getElementById('colorDepth').innerHTML = "Your screen color depth: "+screen.colorDepth;
	document.getElementById('pixelDepth').innerHTML =  "Your screen pixel depth: "+screen.pixelDepth;
}
//Save Local Storage
function saveLS(){
	let width = document.getElementById("horizontal").value;
	let height = document.getElementById("vertical").value;
	let inch = document.getElementById("diagonal").value;
	let ppi = answer;
	var data = [width, height, inch, ppi];
	if(localStorage.length>0){
		let key = localStorage.length+1;
		localStorage.setItem(key, JSON.stringify(data));
	}
	else{
		localStorage.setItem(1, JSON.stringify(data));
	}
}
//Get Local Storage
function getLS(){
	length = localStorage.length;
	console.log(length);
	var key,j,i;
	var el;
	var prefix = 'place';
	if(length>5){
		for(j=0; el = document.getElementById(prefix + j); j++){
			key = length-j;
			var retrievedData = localStorage.getItem(key);
			var dataRaw = JSON.parse(retrievedData);
			var data = dataRaw[0]+'px x '+dataRaw[1]+'px ' + dataRaw[2] + '" ' + dataRaw[3] + 'ppi';
			//https://community.spiceworks.com/topic/445381-javascript-looping-through-a-series-of-element-id-s-using-end-digit-as-index
			el.innerHTML = data;
		}
	}
	else{
		for(i=0; el = document.getElementById(prefix + i); i++){
			var retrievedData = localStorage.getItem(i+1);
			var dataRaw = JSON.parse(retrievedData);
			var data = dataRaw[0]+'px x '+dataRaw[1]+'px ' + dataRaw[2] + '" ' + dataRaw[3] + 'ppi';
			el.innerHTML = data;
		}
	}
	
}



