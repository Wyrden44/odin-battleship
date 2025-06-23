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
                ship.id = `ship-${shipInfo.size}-${i}`
                ship.setAttribute("draggable", "true");

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

    static getAllShips() {
        const containers = document.querySelectorAll(".ship-type-container");
        let shipElements = [];

        containers.forEach(container => {
            const ships = container.querySelectorAll("div[draggable='true']");
            ships.forEach(ship => {
                shipElements.push(ship);
            });
        });
        
        return shipElements;
    }
}