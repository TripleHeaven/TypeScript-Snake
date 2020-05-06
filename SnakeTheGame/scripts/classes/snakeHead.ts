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
        if (this.startX + this.speedX > this.grid.gridsize - 1){
          this.grid.grid[this.startX][this.startY].state = 0;
          this.grid.grid[0][this.startY+this.speedY].state = 1;
          this.startX = 0;
        }
        else if (this.startY + this.speedY > this.grid.gridsize - 1){
          this.grid.grid[this.startX][this.startY].state = 0;
          this.grid.grid[this.startX+this.speedX][0].state = 1;
          this.startY = 0;
        }
        else if (this.startX + this.speedX < 0){
          this.grid.grid[this.startX][this.startY].state = 0;
          this.grid.grid[this.grid.gridsize -1][this.startY].state = 1;
          this.startX = this.grid.gridsize -1 ;
        }
        else if (this.startY + this.speedY < 0){
          this.grid.grid[this.startX][this.startY].state = 0;
          this.grid.grid[this.startX][this.grid.gridsize - 1].state = 1;
          this.startY = this.grid.gridsize - 1;
        }        
        else{
        this.grid.grid[this.startX][this.startY].state = 0;
        this.grid.grid[this.startX + this.speedX][this.startY + this.speedY].state = 1;
        this.startX+=this.speedX;
        this.startY+=this.speedY
        }

        
    }

}