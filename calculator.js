let EUR = 1;
let USD = 1.177919;
let GBP = 0.877154874;
let RUB = 72.0880661;
let CAD = 1.5093263;
let JPY = 130.74914;
let MXN = 23.2767315;


function init(){
	EUR = document.getElementById("EUR");
    USD = document.getElementById("USD");
    GBP = document.getElementById("GBP");
    RUB = document.getElementById("RUB");
    CAD = document.getElementById("CAD");
    JPY = document.getElementById("JPY");
    MXN = document.getElementById("MXN");
}

function converter(){
	USD.value = parseFloat(EUR.value) * USD;
	GBP.value = parseFloat(EUR.value) * GBP;
	RUB.value = parseFloat(EUR.value) * RUB;
	CAD.value = parseFloat(EUR.value) * CAD;
	JPY.value = parseFloat(EUR.value) * JPY;
	MXN.value = parseFloat(EUR.value) * MXN;
}

init();