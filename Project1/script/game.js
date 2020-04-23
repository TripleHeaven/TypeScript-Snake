// finding the canvas element
var canvas = document.getElementById("myCanvas");
// drawing object for canvas
    var ctx = canvas.getContext("2d");
var x = 10;
var y = 10;
var dx = 1;
var dy = 1;
function draw() {
    // drawing code
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x+=dx;
    y+=dy;
    
}
function toDraw(){
    
    setInterval(draw,10);
}


