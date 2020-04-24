import {Grid} from "./Grid";
export {Drawing};
class Drawing{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    squareSize : number;
    constructor (squareSize : number, canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D){
        this.canvas = canvas;
        this.ctx = ctx;
        this.squareSize = squareSize;
    }
    Draw(obj : Grid){
        // quantity of squares according to px size and canvas width
        let brickCount = this.canvas.width / this.squareSize;
        let currentX = 0 ;
        let currentY = 0 ;
        for (let ix = 0 ; ix < obj.gridsize; ix++){
            for (let iy = 0 ; iy < obj.gridsize; iy ++){
                // 0 - field 1 - headsnake 2 - snakepart 3 - apple 4 - bonusApple
                switch (obj.grid[ix][iy].state) {
                    case 0:
                        //drawing Field
                        this.ctx.beginPath();
                        this.ctx.rect(currentX, currentY, this.squareSize, this.squareSize);
                       // this.ctx.fillStyle = "#0095DD";
                       // this.ctx.fill();
                       this.ctx.stroke();
                       // this.ctx.closePath();
                      break;
                    case 4:
                      alert( 'В точку!' );
                      break;
                    case 5:
                      alert( 'Перебор' );
                      break;
                    default:
                      alert( "Нет таких значений" );
                  }
                  currentX +=this.squareSize;
            }
            currentY += this.squareSize;
            currentX = 0;
        }
    }
}