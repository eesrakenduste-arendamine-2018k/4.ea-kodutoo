bodyWeightArray = []
labelsArray = []
dataArray = []

window.onload = function(){
    ctx = document.getElementById('line-chart');
    config = {
        type: 'line',
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Kehakaal',
                fill: false,
                backgroundColor: 'rgb(51, 153, 255)',
                borderColor: 'rgb(51, 153, 255)',
                data: dataArray,
            }]
        },

        options: {}
    };
createNewChart = new Chart(ctx, config)
}
// Lisab kehakaalu ja hetkekuupäeva ühte massiivi ning salvestab selle localstoragesse.
bodyWeightToArray = function(){
    bodyWeight = document.getElementById('bodyWeight').value
    bodyWeightDate = getDate()
    bodyWeightArray.push(bodyWeight+";"+bodyWeightDate)
    localStorage.setItem("bodyArray", JSON.stringify(bodyWeightArray));
    splitArrays()
}
// Võtab hetke kuupäeva
getDate = function(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = day + "/" + month + "/" + year;
    return newdate
}
// Lõikab bodyWeightArray kaheks, kaalu väärtused lisab dataArraysse ja kuupäeva LabelArraysse
splitArrays = function(){
bodyWeightArray = JSON.parse(localStorage.getItem("bodyArray"));
dataArray = []
labelsArray = []
bodyWeightArray.forEach(function(element){
    arrayElement = element.split(';');
    dataArray.push(arrayElement[0]);
    labelsArray.push(arrayElement[1]);
})}

document.getElementById('addData').addEventListener('click', function() {
    chartUpdate()
})
//Kui lisatakse uusi andmeid siis uuendab charti
chartUpdate = function(){
    ctx = document.getElementById('line-chart');
    config = {
        type: 'line',
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Kehakaal',
                fill: false,
                backgroundColor: 'rgb(51, 153, 255)',
                borderColor: 'rgb(51, 153, 255)',
                data: dataArray,
            }]
        },
        options: {}
    };
createNewChart = new Chart(ctx, config)

}