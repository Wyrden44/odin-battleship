import GameController from "./game/gameController";
import DOMManager from "./interface/DOMManager";

class AppController {
    constructor() {
        this.gameController = new GameController();
        this.DOMManager = new DOMManager(this);
    }

    
}