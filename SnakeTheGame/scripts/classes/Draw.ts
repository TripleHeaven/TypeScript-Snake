class Grid{
    grid : Array<object>;
    gridsize: number;
    constructor(size: number){
        this.gridsize = size;
        // Making a grid from size
        // Grid structure : 0 - x 1 - y 2 - state
        // State : 0 - none 1 - headsnake 2 - snakepart 3 - apple 4 - bonusApple
        for (let x = 0 ; x < this.gridsize; x++){
            this.grid[x] =  [];
            for (let y = 0 ; y < this.gridsize; y++){
                this.grid[x][y] = {x : 0,y : 0,state : 0};
                this.grid[x][y].x = x;
                this.grid[x][y].y = y;
            }
        }
    }

}