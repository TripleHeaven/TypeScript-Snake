import { SnakeHead } from "./snakeHead";
export {InformationToShow}
class InformationToShow{
    sh:SnakeHead;
    constructor (sh : SnakeHead){
        this.sh = sh;
    }
    showDirection(id : string){
        // shows current direction on the screen 
            let outsidelabel = document.getElementById(id);            
            outsidelabel.innerHTML = this.sh.forward; 
    }
}