import Ship from "./ship";

export default class Board {
    constructor(width, height) {
        // 0 - empty; 1 - missed; 2 - hit
        this.board = Array.from({ length: width }, () => Array.from({ length: height }, () => 0));
        this.ships = [];
        this.width = width;
        this.height = height;
    }

    receiveMove(pos) {
        // updates the hit position and ship (if hit)
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
        const positions = ship.getAllSurroundingPositions();
        for (let i = 0; i<positions.length; i++) {
            // mark all squares around a position that are not part of the ship as hit
            if (this.onBoard(newPos)) {
                if (this.checkEmpty(newPos)) {
                    this.board[newPos[0]][newPos[1]] = 1; // mark as hit
                }
            }
        }
    }

    onBoard(position) {
        return (position[0] >= 0 && position[0] < this.width && position[1] >= 0 && position[1] < this.height)
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

    addShip(ship) {
        this.ships.push(ship);
    }

    removeShip(row, col) {
        // selects and removes ship from ships list
        shipLoop: for (let i=0; i<this.ships.length; i++) {
            for (let pos of this.ships[i].getAllSquarePositions()) {
                if (pos[0] === row && pos[1] === col) {
                    this.ships.splice(i, 1);
                    break shipLoop;
                }
            }
        }
    }

    checkValidShipPosition(ship) {
        // checks whether or not a ship can be placed on the position
        for (let pos of ship.getAllSquarePositions()) {
            if (!this.onBoard(pos)) {
                return false;
            }
            for (let otherShip of this.ships) {
                if (otherShip.onShip(pos)) {
                    return false;
                }
            }
        }
        for (let pos of ship.getAllSurroundingPositions()) {
            for (let otherShip of this.ships) {
                if (otherShip.onShip(pos)) {
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

    getShipIndex(row, col) {
        for (let i=0; i<this.ships.length; i++) {
            for (let position of this.ships[i].getAllSquarePositions()) {
                if (position[0] === row && position[1] === col) {
                    return i;
                }
            }
        }
        return -1;
    }

    checkRotatable(row, col) {
        let success = false;
        let idx = this.getShipIndex(row, col);
        if (idx !== -1) { // ship found
            let ship = this.ships[idx];
            // rotate ship and check if valid posiiton
            ship.rotate();
            // temporarily remove ship from ships list
            this.ships.splice(idx, 1);
            if (this.checkValidShipPosition(ship)) {
                success = true;
            }
            else {
                success = false;
            }
            // reset ship back to its normal position
            ship.rotate();
            this.ships.push(ship);
        }
        return success;
    }

    rotateShip(row, col) {
        let idx = this.getShipIndex(row, col);
        if (idx !== -1) {
            this.ships[idx].rotate();
        }
    }
}