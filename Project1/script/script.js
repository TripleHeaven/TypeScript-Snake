
// finding the canvas element
var canvas = document.getElementById("myCanvas");
// drawing object for canvas
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
function myFunction() {
    var xStart = document.getElementById("xStart").value;
    var yStart = document.getElementById("yStart").value;
    var xEnd = document.getElementById("xEnd").value;
    var yEnd = document.getElementById("yEnd").value;
    var canvas = document.getElementById("myCanvas");
 var ctx = canvas.getContext("2d");
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
  ctx.moveTo(0,0);
  }