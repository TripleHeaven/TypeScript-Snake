import {Grid} from "./Grid";

class Drawing{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    squareSize : number;
    constructor (squareSize : number){
        this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
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
                switch (obj.gridsize[ix][iy].case) {
                    case 0:
                        //drawing Field
                        ctx.beginPath();
                        ctx.rect(currentX, currentY, this.squareSize, this.squareSize);
                        //ctx.fillStyle = "#0095DD";
                        //ctx.fill();
                        ctx.closePath();
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
        }
    }
}