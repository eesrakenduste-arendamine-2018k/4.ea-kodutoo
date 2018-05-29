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

        options: {
             maintainAspectRatio : false,
             responsive : true
        }
    };
    createNewChart = new Chart(ctx, config)
    
}

// Lisab kehakaalu ja hetkekuupäeva ühte massiivi ning salvestab selle localstoragesse.
bodyWeightToArray = function(){
    let bodyWeightArray = JSON.parse(localStorage.getItem('bodyArray'))
    if (bodyWeightArray === null) bodyWeightArray = []
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

splitArrays()
document.getElementById('addData').addEventListener('click', function() {
    createNewChart.destroy();
    chartUpdate()
})
//Kui lisatakse uusi andmeid siis uuendab charti
chartUpdate = function(){
    console.log("update")
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
        options: {
            responsive : true,
            maintainAspectRatio : false
        }
    };
createNewChart = new Chart(ctx, config)
}
window.onresize = function(event) {
    console.log("resize")
    chartUpdate()
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}