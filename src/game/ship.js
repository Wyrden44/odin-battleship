export default class Ship {
    constructor(position, length, rotation) {
        this.startPosition = position;
        this.shipLength = length;
        this.rotation = rotation;
        // ship cells
        this.cells = Array(this.shipLength).fill(false);
    }

    isHit(position) {
        // checks if position is on ship
        if (this.rotation === "vertical") {
            if (position[1] < this.startPosition[1] + this.shipLength && position[1] >= this.startPosition[1]) {
                if (position[0] === this.startPosition[0]) {
                    return true;
                }
            }
        }
        if (position[0] < this.startPosition[0] + this.shipLength && position[0] >= this.startPosition[0]) {
            if (position[1] === this.startPosition[1]) {
                return true;
            }
        }
        return false;
    }

    hit(position) {
        // hits the ship at position
        let cellPosition = 0;
        // get the cell that was hit
        if (this.rotation === "vertical") {
            cellPosition = this.startPosition[1] - position[1];
        }
        else {
            cellPosition = this.startPosition[0] - position[0];
        }
        // mark the cell as hit
        this.cells[cellPosition] = true;
    }

    isSunk() {
        return !this.cells.includes(false);
    }

    getAllSquarePositions() {
        // returns all grid position of the ships cells
        const positions = [];
        for (let i=0; i<this.shipLength; i++) {
            if (this.rotation === "vertical") {
                positions.push([this.startPosition[0]+i, this.startPosition[1]]);
            }
            else {
                positions.push([this.startPosition[0], this.startPosition[1]+i]);
            }
        }
        return positions;
    }

    onShip(pos) {
        // checks whether or not a position is on the ship
        for (let pos2 of this.getAllSquarePositions()) {
            if (pos[0] === pos2[0] && pos[1] === pos2[1]) {
                return true;
            }
        }
        return false;
    }

    getAllSurroundingPositions() {
        // marks all squares around a ship after sinking
        const positions = this.getAllSquarePositions();
        const surrounding = [];
        for (let i = 0; i<positions.length; i++) {
            // mark all squares around a position that are not part of the ship as hit
            for (let direction of [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
                let newPos = [positions[i][0] + direction[0], positions[i][1] + direction[1]];
                // Check if newPos is not in positions
                if (positions.some(pos => pos[0] === newPos[0] && pos[1] === newPos[1])) {
                    continue
                }
                surrounding.push(newPos);
            }
        }
        return surrounding;
    }
}