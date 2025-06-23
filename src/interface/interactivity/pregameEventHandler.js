export default class PregameEventHandler {
    constructor(appController, shipElements, boardCells) {
        this.appController = appController;
        this.createEvents(shipElements, boardCells);
    }

    createEvents(shipElements, boardCells) {
        this.addShipContainerEvents(shipElements);
        this.addDropzoneEvents(boardCells);
    }

    disableEvents(shipElements) {
        //this.disableShipContainerEvents(shipElements());
    }

    addShipContainerEvents(shipElements) {
        shipElements.forEach(ship => {
            ship.addEventListener("dragstart", e => this.onDragStart(e, ship));
            ship.addEventListener("dragend", e => this.onDragEnd(e, ship));
        });
    }

    addDropzoneEvents(boardCells) {
        boardCells.forEach(cell => {
            cell.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            cell.addEventListener("drop", e => {
                const data = e.dataTransfer.getData("text/plain");
                if (/^ship-[0-9]/.test(data)) {
                    const shipSize = +data.split("-")[1];

                    const column = +cell.getAttribute("data-col");
                    const row = +cell.getAttribute("data-row");
                    const rotation = "horizontal";

                    const success = this.appController.addShip(1, row, column, rotation, shipSize);

                    // remove dropped ship from ship container if successfully added
                    if (success) {
                        document.querySelector(`#${data}`).remove();
                    }
                }
            });
        });
    }

    dropShip(e, cell) {
        // drops the selected ship onto the board if possible
    }

    disableShipContainerEvents(shipElements) {
        shipElements.forEach(ship => {
            ship.removeEventListener("dragstart", this.onDragStart(e, ship));
            ship.removeEventListener("dragend", this.onDragEnd(e, ship));
        });
    }

    onDragEnd(e, ship) {
        const data = e.dataTransfer.getData("text/plain");
        console.log("Dragend", data, "TARGET", e.target, e.target.id);
    };

    onDragStart(e, ship) {
        e.dataTransfer.setData("text/plain", e.target.id);
    };
}