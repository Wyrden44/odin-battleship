import Board from "./board";
import ShipContainer from "./shipContainer";

export default class Player {
    constructor(name) {
        this.gameboard = new Board(10, 10); // TODO: remove magic number
        this.name = name;
        this.shipContainer = new ShipContainer(10, [[1, 4], [2, 3], [3, 2], [4, 1]]); // pregame ship container with all possible ships
    }

    validatePosition(pos) {
        if (this.gameboard.checkEmpty(pos)) {
            return true;
        }
        return false;
    }

    receiveMove(pos) {
        this.gameboard.receiveMove(pos);
    }

    shipHit(pos) {
        return (this.gameboard.shipHit(pos) !== null);
    }

    gameOver() {
        return this.gameboard.checkAllSunk();
    }
}