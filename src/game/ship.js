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
        console.log("CELLS", this.cells)
        return !this.cells.includes(false);
    }

    getAllSquarePositions() {
        // returns all grid position of the ships cells
        const positions = [];
        for (let i=0; i<this.shipLength; i++) {
            if (this.position === "vertical") {
                positions.push([this.startPosition[0], this.startPosition[1]+1]);
            }
            else {
                positions.push([this.startPosition[0]+i, this.startPosition[1]]);
            }
        }
        return positions;
    }
}