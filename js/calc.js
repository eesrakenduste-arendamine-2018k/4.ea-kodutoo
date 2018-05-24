function calculate(){
    var width = screen.width,
    height = screen.height,
    x = $("#horizontal").val(width),
    y = $("#vertical").val(height);
$('submit').click(function(){
    	var x = $("#horizontal").val(),
    	y = $("#vertical").val(),
    	inch = $("#diagonal").val(),
    	result = $("#resultTest"),
    	sqroot = +(x*x) + +(y*y);
     
    	if(x==0)
    		result.val("Horizontal resolution cannot be empty.");
    	else if (y==0)
    		result.val("Vertical resolution cannot be empty.");
    	else if(inch==0)
    		result.val("Diagnol screen size cannot be empty.")
    	else
    		result.val((Math.sqrt(sqroot) / inch).toFixed(2) + " Pixel Per Inch (PPI) Density.");
    });
}