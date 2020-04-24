import {Grid} from "./classes/Grid";
import {Drawing} from "./classes/Drawing";
//initializing things

const button = document.getElementById("my_button");
button.addEventListener("click", (e:Event) => start());
function start(){
    let cs = document.getElementById("gamewindow") as HTMLCanvasElement;
let csx = cs.getContext("2d") as CanvasRenderingContext2D;

let grid = new Grid(10);
let drawing = new Drawing(40,cs, csx);
drawing.Draw(grid);
}

function go(){
    alert("hello");
}


