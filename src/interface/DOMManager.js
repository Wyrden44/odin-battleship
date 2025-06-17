import PlayerDisplayer from "./playerDisplayer";
import ShipContainerDisplayer from "./shipContainerDisplayer";

export default class DOMManager {
    constructor(appController) {
        this.appController = appController;
    }

    buildWebpage(player1, player2, board1, board2) {
        const mainContainer = document.querySelector("body");
        
        const p1Container = PlayerDisplayer.createPlayer(player1.name, 1, board1);
        const p2Container = PlayerDisplayer.createPlayer(player2.name, 2, board2);

        const shipContainer = ShipContainerDisplayer.createShipContainer()

        mainContainer.appendChild(p1Container);
        mainContainer.appendChild(p2Container);
    }
}