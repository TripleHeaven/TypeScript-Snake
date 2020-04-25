import {Grid} from "./Grid";
import { start } from "repl";
export {SnakeHead};
class SnakeHead{
    grid : Grid;
    startX : number;
    startY : number;
    speed : number;
    forward : string;
    speedX : number;
    speedY : number;
    constructor (startX : number, startY: number, speed:number , forward : string , grid: Grid){
        this.startX = startX;
        this.startY = startY;
        this.speed = speed;
        this.forward = forward;
        this.grid = grid;
        this.grid.grid[this.startX][this.startY].state = 1;
        
    }
    move (){
        switch (this.forward) {
            case "left":
                this.speedX = 0;
                this.speedY = -1;
              break;
            case "up":
                this.speedX = -1;
                this.speedY = 0;
              break;
            case "right":
                this.speedX = 0;
                this.speedY = 1;
              break;
            case "down":
                this.speedX = 1;
                this.speedY = 0;
          }   
        this.grid.grid[this.startX][this.startY].state = 0;
        this.grid.grid[this.startX + this.speedX][this.startY + this.speedY].state = 1;
        this.startX+=this.speedX;
        this.startY+=this.speedY

        
    }

}