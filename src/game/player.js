class Player {
    constructor(gameboard, name) {
        this.gameboard = gameboard;
        this.name = name;
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
}