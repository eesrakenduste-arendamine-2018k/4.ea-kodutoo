bodyWeightToArray = function(){
    bodyWeight = document.getElementById('bodyWeight').value
    bodyWeightDate = getDate()
    bodyWeightArray.push(bodyWeight+";"+bodyWeightDate)
    localStorage.setItem("bodyArray", JSON.stringify(bodyWeightArray));
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
bodyWeightArray = JSON.parse(localStorage.getItem("bodyArray"));
console.log(bodyWeightArray)
bodyWeightArray.forEach(function(element){
    arrayElement = element.split(';');
    dataArray.push(arrayElement[0]);
    labelsArray.push(arrayElement[1]);
})}

readOldData = function(){
bodyWeightArray = JSON.parse(localStorage.getItem("bodyArray"));
console.log(bodyWeightArray)
bodyWeightArray.forEach(function(element){
    arrayElement = element.split(';');
    dataArray.push(arrayElement[0]);
    labelsArray.push(arrayElement[1]);
})

//console.log(JSON.parse(localStorage.getItem("bodyArray")))
//console.log(dataArray)
//console.log(labelsArray)
/*document.getElementById('addData').addEventListener('click', function() {
    //siin on probleem, ta mitte ei uuenda vaid ta liidab kaks massiivi üksteise otsa
    
    //createNewChart.config.data.datasets = {data: [dataArray]}
    console.log(config)
    createNewChart.destroy(config)
    console.log(config)
    createNewChart.update(config)
    
})
*/
ctx = document.getElementById('line-chart');

config = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labelsArray,
        datasets: [{
            fill: false,
            backgroundColor: 'rgb(51, 153, 255)',
            borderColor: 'rgb(51, 153, 255)',
            data: dataArray,
        }]
    },

    // Configuration options go here
    options: {}
};
}
document.getElementById('addData').addEventListener('click', function() {
    //siin on probleem, ta mitte ei uuenda vaid ta liidab kaks massiivi üksteise otsa
    //liidab sellele dataarrayle uuesti selle dataarray otsa
    //mdea pop töötab
    
    createNewChart.update(config)
    //createNewChart.destroy()

})
