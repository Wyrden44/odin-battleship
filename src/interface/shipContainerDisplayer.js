export default class ShipContainerDisplayer {
    static createShipContainer(shipInformation) {
        const shipContainer = document.createElement("div");
        shipContainer.classList.add("ship-container");

        shipInformation.forEach(shipInfo => {
            const shipTypeContainer = document.createElement("div");
            shipTypeContainer.classList.add(`ship-${shipInfo.size}-container`)
            shipTypeContainer.classList.add(`ship-type-container`)
            for (let i = 0; i < shipInfo.amount; i++) {
                // create ship
                let ship = document.createElement("div");
                ship.classList.add(`ship-${shipInfo.size}`);

                for (let j = 0; j < shipInfo.size; j++) {
                    let shipCell = document.createElement("div");
                    shipCell.classList.add("ship-cell");

                    ship.appendChild(shipCell);
                }

                shipTypeContainer.appendChild(ship);
            }

            shipContainer.appendChild(shipTypeContainer)
        });

        return shipContainer;
    }
}