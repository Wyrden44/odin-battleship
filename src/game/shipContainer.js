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
        shipSpecifications.forEach(shipInfo => {
            for (let i=0; i<shipInfo.amount; i++) {
                if (currentPosition[1] + shipInfo.size > this.width) {
                    currentPosition[1] = 0;
                    currentPosition[0] += 2;
                }
                ships.push(new Ship(currentPosition.slice(), shipInfo.size, "horizontal"));
                currentPosition[1]++;
            }
        });
        return ships;
    }
}