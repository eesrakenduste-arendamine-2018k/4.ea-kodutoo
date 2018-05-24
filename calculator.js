let EUR = 1;
let USD = 1.177919;
let GBP = 0.877154874;
let RUB = 72.0880661;
let CAD = 1.5093263;
let JPY = 130.74914;
let MXN = 23.2767315;

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
	EUR = parseFloat(document.getElementById("EUR").value);
	/*console.log(EUR);
	let NEWUSD = parseFloat(EUR.value) * parseFloat(USD);
	console.log(USD);
	document.getElementById("USD").value = parseFloat(NEWUSD);*/
	USD.value = parseFloat(EUR.value) * USD;
	document.getElementById("USD").value = USD.value;
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
