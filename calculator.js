/*$(function () {
	$(".content").click(function () {

		let value = $(this).find(".number").text();

		if (value !== "<") {
			$(".numberinput").each(function () {
				let a = $(this).text();
				if (!a) {
					$(this).text(value);
					return false;
				}
			});
		} else {
			$($(".numberinput").get().reverse()).each(function () {
				let a = $(this).text();
				if (a) {
					$(this).text("");
					return false;
				}
			});
		}
	});
});*/

/*function init(){
		EUR = document.getElementById("EUR").value;
    USD = document.getElementById("USD").value;
    GBP = document.getElementById("GBP").value;
    RUB = document.getElementById("RUB").value;
    CAD = document.getElementById("CAD").value;
    JPY = document.getElementById("JPY").value;
    MXN = document.getElementById("MXN").value;
}*/
function eurConverter(){
	let EUR = parseFloat(document.getElementById("EUR").value);
	let USD = 1.177919;
	let GBP = 0.877154874;
	let RUB = 72.0880661;
	let CAD = 1.5093263;
	let JPY = 130.74914;
	let MXN = 23.2767315;
	let newUSD = EUR * USD;
	document.getElementById("USD").value = Math.round(newUSD * 100) / 100;
	let newGBP = EUR * GBP;
	document.getElementById("GBP").value = Math.round(newGBP * 100) / 100;
	let newRUB = EUR * RUB;
	document.getElementById("RUB").value = Math.round(newRUB * 100) / 100;
	let newCAD = EUR * CAD;
	document.getElementById("CAD").value = Math.round(newCAD * 100) / 100;
	let newJPY = EUR * JPY;
	document.getElementById("JPY").value = Math.round(newJPY * 100) / 100;
	let newMXN = EUR * MXN;
	document.getElementById("MXN").value = Math.round(newMXN * 100) / 100;
}

function usdConverter(){
	let EUR = 0.852914836
	let USD = parseFloat(document.getElementById("USD").value);
	let GBP = 0.74717977;
	let RUB = 61.6446801;
	let CAD = 1.28908506;
	let JPY = 109.325462;
	let MXN = 19.7199763;
	let newEUR = USD*EUR;
	document.getElementById("EUR").value = Math.round(newEUR * 100) / 100;
	let newGBP = USD * GBP;
	document.getElementById("GBP").value = Math.round(newGBP * 100) / 100;
	let newRUB = USD * RUB;
	document.getElementById("RUB").value = Math.round(newRUB * 100) / 100;
	let newCAD = USD * CAD;
	document.getElementById("CAD").value = Math.round(newCAD * 100) / 100;
	let newJPY = USD * JPY;
	document.getElementById("JPY").value = Math.round(newJPY * 100) / 100;
	let newMXN = USD * MXN;
	document.getElementById("MXN").value = Math.round(newMXN * 100) / 100;
}

function gbpConverter(){
	let EUR = 1.14151222
	let USD = 1.338366
	let GBP = parseFloat(document.getElementById("GBP").value);
	let RUB = 82.5031439;
	let CAD = 1.72526761;
	let JPY = 146.317481;
	let MXN = 26.3925458;
	let newEUR = GBP*EUR;
	document.getElementById("EUR").value = Math.round(newEUR * 100) / 100;
	let newUSD = GBP*USD;
	document.getElementById("USD").value = Math.round(newUSD * 100) / 100;
	let newRUB = USD * RUB;
	document.getElementById("RUB").value = Math.round(newRUB * 100) / 100;
	let newCAD = USD * CAD;
	document.getElementById("CAD").value = Math.round(newCAD * 100) / 100;
	let newJPY = USD * JPY;
	document.getElementById("JPY").value = Math.round(newJPY * 100) / 100;
	let newMXN = USD * MXN;
	document.getElementById("MXN").value = Math.round(newMXN * 100) / 100;
}

function rubConverter(){
	let EUR = 0.0138359845;
	let USD = 0.016222;
	let GBP = 0.0121207502;
	let RUB = parseFloat(document.getElementById("RUB").value);
	let CAD = 0.0209115378;
	let JPY = 1.77347764;
	let MXN = 0.319897456;
	let newEUR = RUB*EUR;
	document.getElementById("EUR").value = Math.round(newEUR * 100) / 100;
	let newUSD = RUB*USD;
	document.getElementById("USD").value = Math.round(newUSD * 100) / 100;
	let newGBP = RUB * GBP;
	document.getElementById("GBP").value = Math.round(newRUB * 100) / 100;
	let newCAD = RUB* CAD;
	document.getElementById("CAD").value = Math.round(newCAD * 100) / 100;
	let newJPY = RUB * JPY;
	document.getElementById("JPY").value = Math.round(newJPY * 100) / 100;
	let newMXN = RUB * MXN;
	document.getElementById("MXN").value = Math.round(newMXN * 100) / 100;
}
/*function converter(){
	EUR.value = document.getElementById("EUR").value;
	USD.value = parseFloat(EUR.value) * USD;
	document.getElementById("USD").value = USD
	GBP.value = parseFloat(EUR.value) * GBP;
	document.getElementById("GBP").value = GBP
	RUB.value = parseFloat(EUR.value) * RUB;
	document.getElementById("RUB").value = RUB
	CAD.value = parseFloat(EUR.value) * CAD;
	document.getElementById("CAD").value = CAD
	JPY.value = parseFloat(EUR.value) * JPY;
	document.getElementById("JPY").value = JPY
	MXN.value = parseFloat(EUR.value) * MXN;
	document.getElementById("MXN").value = MXN
}*/

//init();
