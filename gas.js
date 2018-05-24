/*
Fuel Consumption Calculator
Inputs:
  Litres consumed
  distance driven
  fuel cost per litre
Output:
  litres used per 100km
*/

 
  
	function computeConsumption (){
		var distance = document.getElementById('distance').value;
		var fuel = document.getElementById('fuel').value;
		var costper = document.getElementById('costper').value;
		var people = document.getElementById('people').value;
		var consumed =  (fuel * (distance/100)).toFixed(2);
		var costper100 = (consumed * costper).toFixed(2);
		var passangers = (costper100/people).toFixed(2);
		var totalFuel = ((distance/100)*fuel).toFixed(2);
		document.getElementById('consumption').innerHTML = "Fuel consumed: " + totalFuel +" Liters"+ "<br>" + ( costper100 )+ " Euros  <br><br>   Total Fuel cost including people = " + (costper100/people).toFixed(2)+ " Euros";
	}

	function registerServiceWorker  () {
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
	

	