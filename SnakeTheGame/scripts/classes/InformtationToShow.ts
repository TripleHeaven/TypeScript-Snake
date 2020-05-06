import { SnakeHead } from "./snakeHead";
import { GameLogic } from "./Logic";
export {InformationToShow}
class InformationToShow{
    sh:SnakeHead;
    logic : GameLogic;
    constructor (sh : SnakeHead, logic : GameLogic){
        this.sh = sh;
        this.logic = logic;
    }
    showMainInfo(idDir : string ,idX : string, idY : string, idScore : string){
        // shows current direction on the screen 
            let outsidelabelDir = document.getElementById(idDir);
            let outsidelabelX = document.getElementById(idX);
            let outsidelabelY = document.getElementById(idY);   
            let outsidelabelScore = document.getElementById(idScore);         
            outsidelabelDir.innerHTML = this.sh.forward; 
            outsidelabelX.innerHTML = this.sh.startX.toString();
            outsidelabelY.innerHTML = this.sh.startY.toString();
            outsidelabelScore.innerHTML = this.logic.score.toString();
    }
}