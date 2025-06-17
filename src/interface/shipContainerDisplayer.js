export default class ShipContainerDisplayer {
    static createShipContainer(shipInformation) {
        const shipContainer = document.createElement("div");
        shipContainer.classList.add("ship-container");

        shipInformation.forEach(shipInfo => {
            let [ numShips, shipLength ] = shipInfo;

            for (let i = 0; i < numShips; i++) {
                // create ship
                let ship = document.createElement("div");
                ship.classList.add(`ship-${shipLength}`);

                for (let j = 0; j < shipLength; j++) {
                    let shipCell = document.createElement("div");
                    shipCell.classList.add("ship-cell");

                    ship.appendChild(shipCell);
                }

                shipContainer.appendChild(ship);
            }
        });

        return shipContainer;
    }
}