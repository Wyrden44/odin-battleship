import Player from "./player";
import Ship from "./ship";

export default class GameController {
    constructor() {
        this.player1 = new Player("Player 1");
        this.player2 = new Player("Player 2");

        // current player is always the receiving player
        this.currentPlayer = this.player2;
        this.gameOver = false;
    }

    // pregame methods
    addShip(boardNumber, row, col, rotation, size) {
        const ship = new Ship([row, col], size, rotation);
        if (boardNumber === 1) {
            console.log(this.player1.gameboard.checkValidShipPosition(ship))
            if (!this.player1.gameboard.checkValidShipPosition(ship)) {
                return false;
            }
            this.player1.gameboard.addShip(ship);
        }
        else {
            if (!this.player2.gameboard.checkValidShipPosition(ship)) {
                return false;
            }
            this.player2.gameboard.addShip(ship);
        }
        return true;
    }

    playRound(playerNumber, position) {
        if (this.validateMove(playerNumber, position)) {
            this.currentPlayer.receiveMove(position);

            if (this.currentPlayer.gameOver()) {
                this.gameOver = true;
                console.log("GAME OVER!");
            }

            if (!this.currentPlayer.shipHit(position)) {
                this.changeTurn();
            }
        }
    }

    changeTurn() {
        this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
    }

    validateMove(playerNumber, position) {
        if (playerNumber === 1 && this.currentPlayer === this.player1 || playerNumber === 2 && this.currentPlayer === this.player2) {
            if (this.currentPlayer.validatePosition(position)) {
                return true;
            }
        }
    }

    reset() {
        this.player1.reset();
        this.player2.reset();
        this.currentPlayer = this.player2;
        this.gameOver = false;
    }
}