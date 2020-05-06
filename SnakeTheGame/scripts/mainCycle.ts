import {Grid} from "./classes/Grid";
import {Drawing} from "./classes/Drawing";
import {SnakeHead} from "./classes/snakeHead";
import {InformationToShow} from "./classes/InformtationToShow"
//initializing things
const button = document.getElementById("my_button");
button.addEventListener("click", (e:Event) => start());
function start(){
let cs = document.getElementById("gamewindow") as HTMLCanvasElement;
let csx = cs.getContext("2d") as CanvasRenderingContext2D;
let grid = new Grid(15);
let drawing = new Drawing(grid,cs, csx);
let snakeH = new SnakeHead(0,0,1,"right",grid);
let infoShow = new InformationToShow (snakeH);

document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        snakeH.forward = "right";
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        snakeH.forward = "left";
    }
    else if (e.key == "Down" || e.key == "ArrowDown"){
        snakeH.forward = "down";
    }
    else if (e.key == "Up" || e.key == "ArrowUp"){
        snakeH.forward = "up";
    }
}

/*function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
}
*/

drawing.Draw(grid);
    setInterval( function() { drawing.Draw(grid),  infoShow.showMainInfo("dirShow","xcoordinate","ycoordinate");snakeH.move()}, 100);
    
}




function go(){
    alert("hello");
}


