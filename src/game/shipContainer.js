import Ship from "./ship";

export default class ShipContainer {
    // container for placing ships pre game
    constructor(width, shipSpecifications) {
        this.width = width; // container width
        this.ships = this.createAllShips(shipSpecifications);
    }

    createAllShips(shipSpecifications) {
        let ships = [];
        let currentPosition = [0, 0]; // current ship position in container
        for (let [ count, length ] of shipSpecifications) {
            for (let i=0; i<count; i++) {
                if (currentPosition[1] + length > this.width) {
                    currentPosition[1] = 0;
                    currentPosition[0] += 2;
                }
                ships.push(new Ship(currentPosition.slice(), length, "horizontal"));
                currentPosition[1]++;
            }
        }
        return ships;
    }
}