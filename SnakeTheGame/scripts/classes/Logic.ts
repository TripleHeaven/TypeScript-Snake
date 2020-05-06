import {SnakeHead} from "./snakeHead";
import {Grid} from "./Grid";
export {GameLogic};

function getRandomInt (min,max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class GameLogic{
    sh: SnakeHead;
    grid:  Grid;
    score: number;
    constructor(sh: SnakeHead, grid: Grid){
        this.sh = sh;
        this.grid = grid;    
        this.score = 0; 
    }
    eventChecker(){
        for (let ix = 0 ; ix < this.grid.gridsize; ix++){
            for (let iy = 0 ; iy < this.grid.gridsize; iy ++){
                // 0 - field 1 - headsnake 2 - snakepart 3 - apple 4 - bonusApple
                // checking if apple is there and snakeHead is there
                if (this.grid.grid[ix][iy].state == 3 && this.sh.startX+ this.sh.speedX== ix && this.sh.startY + this.sh.speedY== iy){
                    this.score = this.score + 1;
                    this.grid.grid[ix][iy].state == 0;
                }
            }
        }        
    }
    // spawning an apple in a random place
    spawnApple(){
        // generating random place to spawn
        let rndX  = getRandomInt(0,this.grid.gridsize - 1);
        let rndY = getRandomInt(0,this.grid.gridsize - 1);
        //checking if head is here
        /*if (this.grid.grid[rndX][rndY].state == 1){
            this.spawnApple();
        }*/
        
            this.grid.grid[rndX][rndY].state = 3;
        
    }
}