export default class PregameEventHandler {
    constructor(appController, shipElements, boardCells) {
        this.appController = appController;
        this.createEvents(shipElements, boardCells);
    }

    createEvents(shipElements, boardCells) {
        this.addShipContainerEvents(shipElements);
        this.addDropzoneEvents(boardCells);
        this.addBoardShipEvents(boardCells);
    }

    disableEvents(shipElements) {
        // TODO
        //this.disableShipContainerEvents(shipElements());
    }

    addBoardShipEvents(boardCells) {
        boardCells.forEach(cell => {
            cell.addEventListener("click", e => this.onCellClick(e));
        });
    }
    
    onCellClick(e) {
        if (e.target.classList.contains("ship")) {
            // cell is part of ship
            const row = +e.target.getAttribute("data-row");
            const col = +e.target.getAttribute("data-col");
            this.appController.rotateShip(1, row, col);
        }
    }

    // disableBoardShipEvents(boardCells) {
    //     boardCells.forEach(cell => {
    //         cell.removeEventListener("click", this.onCellClick);
    //     });
    // }

    addShipContainerEvents(shipElements) {
        shipElements.forEach(ship => {
            ship.addEventListener("dragstart", this.onDragStart);
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
            ship.removeEventListener("dragstart", this.onDragStart);
        });
    }

    onDragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    };
}