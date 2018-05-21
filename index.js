bodyWeightArray = []
labelsArray = [];
dataArray = [];


bodyWeightToArray = function(){
    bodyWeight = document.getElementById('bodyWeight').value
    bodyWeightDate = getDate()
    bodyWeightArray.push(bodyWeight+";"+bodyWeightDate)
    splitArrays()
    //Storage.prototype.setObject = function(key, value) {
    //this.setItem(key, JSON.stringify(value));
}
    //localStorage.setItem("userDate", JSON.stringify(bodyWeightDate));



getDate = function(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = day + "/" + month + "/" + year;
    return newdate
}
splitArrays = function(){
   
bodyWeightArray.forEach(function(element){
    var arrayElement = element.split(';');
    dataArray.push(arrayElement[0]);
    labelsArray.push(arrayElement[1]);
    slicedLabel = labelsArray.slice(-1)[0]
    console.log(slicedLabel)
    slicedData = dataArray.slice(-1)[0]
    console.log(slicedData)
    
    console.log("pushitud")
})}

var ctx = document.getElementById('line-chart');
var config = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["kuupäev"],
        datasets: [{
            label: "My First dataset",
            fill: false,
            backgroundColor: 'rgb(51, 153, 255)',
            borderColor: 'rgb(51, 153, 255)',
            data: [90, 100],
        }]
    },

    // Configuration options go here
    options: {}
};
console.log(dataArray)
console.log(labelsArray)
document.getElementById('addData').addEventListener('click', function() {
			if (config.data.datasets.length > 0) {
                console.log(slicedLabel, "newLabel")
				config.data.labels.push(slicedLabel);
				config.data.datasets.forEach(function(dataset) {
                    console.log(slicedData, "newData")
					dataset.data.push(slicedData);
				});

				createNewChart.update();
			}
		});
var createNewChart = new Chart(ctx, config)
