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

    // pregame
    addShip(boardNumber, row, col, rotation, size) {
        const success = this.gameController.addShip(boardNumber, row, col, rotation, size);
        if (success) {
            this.DOMManager.redisplayShips(boardNumber, this.gameController.player1.getShips());
        }
        return success;
    }

    rotateShip(boardNumber, row, col) {
        const success = this.gameController.rotateShip(boardNumber, row, col);
        if (success) {
            this.DOMManager.redisplayShips(boardNumber, this.gameController.player1.getShips());
        }
        return success;
    }

    removeShip(boardNumber, row, col) {
        const shipType = this.gameController.removeShip(boardNumber, row, col);
        this.DOMManager.redisplayShips(boardNumber, this.gameController.player1.getShips());
        this.DOMManager.addShipToShipContainer(boardNumber, shipType);
    }
}