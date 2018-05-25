let string = "";
let lastActive;
$(document).ready(function() {
  $("input").blur(function(){
    var lastActive = this.id
    console.log(lastActive);
  });

    $("button").click(function() {
        var clicked = $(this).val();
        if(clicked == "del") {
          if (string.length > 0) {
            string = string.substring(0, string.length -1);
          } else {
            //console.log("Nothing to delete");
          }
        }
        if(clicked == ".") {
          if(string.indexOf(clicked) !== -1){
            string = string+clicked;
          } else {
            //console.log(". Already exists");
          }
        }
        if(0 <= clicked <= 9 && clicked !== "del") {
          string = string + clicked;
        }
        //console.log(clicked);
        console.log(string);
        //parseda string floatiks ja kirjutada viimasena klikitud inputi.
          //addValue(lastActive, string);
          console.log(string);
    });

});

function addValue(elementid, inputNumber) {
    document.getElementById(elementid).value = parseFloat(inputNumber);
}
  //Lisada funktsioon, mis salvestab viimasena klikitud input elemendi ID.
//Kui elemendi fookusesse tuleb, peaks stringi väärtustama element.valuega
