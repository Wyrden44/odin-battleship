export default class ShipContainerDisplayer {
    static createShipContainer(shipInformation) {
        const shipContainer = document.createElement("div");
        shipContainer.classList.add("ship-container");

        shipInformation.forEach(shipInfo => {
            const shipTypeContainer = document.createElement("div");
            shipTypeContainer.classList.add(`ship-${shipInfo.size}-container`)
            shipTypeContainer.classList.add(`ship-type-container`)
            for (let i = 0; i < shipInfo.amount; i++) {
                let ship = this.createShip(shipInfo.size, i);

                shipTypeContainer.appendChild(ship);
            }

            shipContainer.appendChild(shipTypeContainer)
        });

        return shipContainer;
    }

    static createShip(size, idNumber) {
        // create ship
        let ship = document.createElement("div");
        ship.classList.add(`ship-${size}`);
        ship.setAttribute("draggable", "true");
        ship.id = `ship-${size}-${idNumber}`;

        for (let j = 0; j < size; j++) {
            let shipCell = document.createElement("div");
            shipCell.classList.add("ship-cell");

            ship.appendChild(shipCell);
        }

        return ship;
    }

    static redisplayShip(boardNumber, shipType) {
        const container = document.querySelector(".ship-container");
        const shipContainer = container.querySelector(`.ship-${shipType}-container`);

        const ships = shipContainer.querySelectorAll(`.ship-${shipType}`);
        for (let ship of ships) {
            if (ship.style.display === "none") {
                ship.style.display = "flex";
                break;
            }
        }
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