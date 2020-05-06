import { SnakeHead } from "./snakeHead";
export {InformationToShow}
class InformationToShow{
    sh:SnakeHead;
    constructor (sh : SnakeHead){
        this.sh = sh;
    }
    showMainInfo(idDir : string ,idX : string, idY : string){
        // shows current direction on the screen 
            let outsidelabelDir = document.getElementById(idDir);
            let outsidelabelX = document.getElementById(idX);
            let outsidelabelY = document.getElementById(idY);            
            outsidelabelDir.innerHTML = this.sh.forward; 
            outsidelabelX.innerHTML = this.sh.startX.toString();
            outsidelabelY.innerHTML = this.sh.startY.toString();

    }
}