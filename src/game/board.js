import Ship from "./ship";

export default class Board {
    constructor(width, height) {
        // 0 - empty; 1 - missed; 2 - hit
        this.board = new Array(width).fill(new Array(height).fill(0));
        this.ships = [];
    }

    receiveAttack(pos) {
        let ship = this.shipHit(pos);
        let marker = 1; // miss
        if (ship !== null) {
            ship.hit(pos);

            if (ship.isSunk()) {
                this.markSunkShipSquares(ship);
            }

            marker = 2; // hit
        }
        this.board[pos[0]][pos[1]] = marker;
    }

    shipHit(pos) {
        // checks if a ship has been hit
        // returns the ship if it has, else null
        for (let ship of this.ships) {
            if (ship.isHit(pos)) {
                return ship;
            }
        }
        return null;
    }

    markSunkShipSquares(ship) {
        // marks all squares around a ship after sinking
        for (let pos of ship.getAllSquarePositions()) {
            // mark all squares around a position that are not part of the ship as hit
            for (let direction of [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
                let newPos = [pos[0] + direction[0], pos[1] + direction[1]];
                if (this.checkEmpty(newPos)) {
                    this.board[newPos[0]][newPos[1]] = 1; // mark as hit
                }
            }
        }
    }

    checkEmpty(pos) {
        // checks wether or not a position can be hit
        if (this.board[pos[0]][pos[1]] !== 0) {
            return false;
        }
        return true;
    }

    addShip(pos, length, rotation) {
        this.ships.push(new Ship(pos, length, rotation));
    }

    checkValidShipPosition(pos, length, rotation) {
        // checks whether or not a ship can be placed on the position
        // get all positions
        for (let i=0; i<length; i++) {
            let position;
            if (rotation === "vertical") {
                position = [pos[0], pos[1]+i];
            }
            else {
                position = [pos[0]+1, pos[1]];
            }
            // check whether or not there is a ship surrounding each position
            for (let direction of [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
                let newPos = [position[0] + direction[0], position[1] + direction[1]];
                if (!this.checkEmpty(newPos)) {
                    return false;
                }
            }
        }
        return true;
    }

    checkAllSunk() {
        for (let ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}