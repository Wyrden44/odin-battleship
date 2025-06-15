import GameController from "./game/gameController";
import DOMManager from "./interface/DOMManager";

export default class AppController {
    constructor() {
        this.gameController = new GameController();
        this.DOMManager = new DOMManager(this);

        this.DOMManager.buildWebpage(
            this.gameController.player1,
            this.gameController.player2,
            this.gameController.player1.gameboard.board,
            this.gameController.player2.gameboard.board
        );
    }

    
}