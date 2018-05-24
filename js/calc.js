"use strict";
function clicked(){
	const width = document.getElementById('horizontal').value;
	const height = document.getElementById('vertical').value;
	const inch = document.getElementById('diagonal').value;
	let answer = '';
	if(width>0 && height>0 && inch>0){
		answer = precisionRound((Math.sqrt((width*width)+(height*height))/inch),2);	
	}
	else{
		answer = 'Values must be greater than 0';
	}
	document.getElementById('result').innerHTML = answer;
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
	function precisionRound(number, precision) {
		var factor = Math.pow(10, precision);
		return Math.round(number * factor) / factor;
	}
}
