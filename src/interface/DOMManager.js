import { shipTypes } from "../utils/settings";
import BoardDisplayer from "./boardDisplayer";
import MainEventHandler from "./interactivity/mainEventHandler";
import PregameEventHandler from "./interactivity/pregameEventHandler";
import PlayerDisplayer from "./playerDisplayer";
import ShipContainerDisplayer from "./shipContainerDisplayer";

export default class DOMManager {
    mainEventHandler;

    constructor(appController) {
        this.appController = appController;
    }

    buildWebpage(player1, player2, board1, board2) {
        const mainContainer = document.querySelector("body");
        
        const p1Container = PlayerDisplayer.createPlayer(player1.name, 1, board1);
        const p2Container = PlayerDisplayer.createPlayer(player2.name, 2, board2);

        const p1shipContainer = ShipContainerDisplayer.createShipContainer(shipTypes);
        
        mainContainer.appendChild(p1shipContainer);
        mainContainer.appendChild(p1Container);
        mainContainer.appendChild(p2Container);

        this.addEventHandlers();
    }

    redisplayShips(boardNumber, ships) {
        BoardDisplayer.redisplayShips(boardNumber, ships)
    }

    addEventHandlers() {
        this.mainEventHandler = new MainEventHandler(this.appController, ShipContainerDisplayer.getAllShips(), BoardDisplayer.getAllCells(1));
    }
}