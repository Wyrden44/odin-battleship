class GameController {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        // current player is always the receiving player
        this.currentPlayer = this.player1;
    }

    playRound(playerNumber, position) {
        if (this.validateMove(playerNumber, position)) {
            this.currentPlayer.receiveMove(position);

            if (this.currentPlayer.gameOver()) {
                console.log("GAME OVER!");
            }

            if (!this.currentPlayer.hitShip(position)) {
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
}