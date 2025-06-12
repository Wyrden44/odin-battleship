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
        // TODO
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
        // TODO
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