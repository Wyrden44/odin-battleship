import PregameEventHandler from "./pregameEventHandler";

export default class MainEventHandler {
    constructor(appController, shipElements, boardCells) {
        this.pregameEventHandler = new PregameEventHandler(appController, shipElements, boardCells);
    }

    startPregame() {
        this.pregameEventHandler.createEvents();
    }

    startGame() {
        this.pregameEventHandler.disableEvents();
    }
}