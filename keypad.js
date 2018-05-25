let string = "";

$(document).ready(function() {
  $("button").click(function() {
      var clicked = $(this).val();
      if(clicked == "del") {
        if (string.length > 0) {
          string.slice(0, -1);
        } else {
          console.log("Nothing to delete");
        }
      }
      if(clicked == ".") {
        if(!string.includes(".")){
          string = string+clicked;
        } else {
          console.log(". Already exists");
        }
      }
      if(0 <= clicked <= 9 && clicked !== "del") {
        string = string + clicked;
      }
      console.log(clicked);
      console.log(string);
  });
});
