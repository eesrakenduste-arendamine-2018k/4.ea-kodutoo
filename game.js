document.getElementById("newGame").style.display="none";
function displayImage(){
	var pildid = ["images/ärtu2.png", "images/ärtu3.png", "images/ärtu4.png", "images/ärtu5.png", "images/ärtu6.png", "images/ärtu7.png", "images/ärtu8.png", "images/ärtu9.png", "images/ärtu10.png", "images/ärtupoiss.png", "images/ärtuemand", "images/ärtukunn.png", "images/ärtuäss.png", "images/poti2.png", "images/poti3.png", "images/poti4.png", "images/poti5.png", "images/poti6.png", "images/poti7.png", "images/poti8.png", "images/poti9.png", "images/poti10.png", "images/potipoiss.png", "images/potiemand.png", "images/potikunn.png", "images/potiäss.png", "images/ruutu2.png", "images/ruutu3.png", "images/ruutu4.png", "images/ruutu5.png", "images/ruutu6.png", "images/ruutu7.png", "images/ruutu8.png", "images/ruutu9.png", "images/ruutu10.png", "images/ruutupoiss.png", "images/ruutuemand.png", "images/ruutukunn.png", "images/ruutuäss.png", "images/risti2.png", "images/risti3.png", "images/risti4.png", "images/risti5.png", "images/risti6.png", "images/risti7.png", "images/risti8.png", "images/risti9.png", "images/risti10.png", "images/ristipoiss.png", "images/ristiemand.png", "images/ristikunn.png", "images/ristiäss.png"];

	var item = pildid[Math.floor(Math.random()*pildid.length)];
	var displayPic = "<img src='" + item + "' width='160' height='120'/>";
	document.getElementById("result").innerHTML = displayPic;

	}
	var score1 = 26
	
	document.getElementById("addPic").addEventListener("click", addCard);

	function addCard() {
    document.getElementById("score").innerHTML = score1 += 1;
	if (score1 == 52){
		document.getElementById("score").innerHTML = "Mäng on läbi! Sa kaotasid";
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
		document.getElementById("score").innerHTML = "Mäng on läbi! Sa võitsid";
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


