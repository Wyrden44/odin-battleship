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

    addShip(boardNumber, row, col, rotation, size) {
        const success = this.gameController.addShip(boardNumber, row, col, rotation, size);
        if (success) {
            this.DOMManager.redisplayShips(boardNumber, this.gameController.player1.getShips());
        }
        return success;
    }
}