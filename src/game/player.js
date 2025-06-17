import { GRID_SIZE, shipTypes } from "../utils/settings";
import Board from "./board";
import ShipContainer from "./shipContainer";

export default class Player {
    constructor(name) {
        this.gameboard = new Board(GRID_SIZE, GRID_SIZE); // TODO: remove magic number
        this.name = name;
        this.shipContainer = new ShipContainer(10, shipTypes); // pregame ship container with all possible ships
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