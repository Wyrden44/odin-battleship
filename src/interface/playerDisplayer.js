import BoardDisplayer from "./boardDisplayer";

export default class PlayerDisplayer {
    static createPlayer(playerName, playerNumber, playerBoardArray) {
        const playerContainer = document.createElement("div");
        playerContainer.classList.add(`player-${playerNumber}-container`);

        const nameContainer = document.createElement("p");
        nameContainer.classList.add("player-name-container");

        const nameLabel = document.createElement("span");
        nameLabel.classList.add("player-name-label");
        nameLabel.textContent = "Name: ";

        const nameElement = document.createElement("span");
        nameElement.classList.add("player-name");
        nameElement.textContent = playerName;
                
        const changeNameButton = document.createElement("button");
        changeNameButton.classList.add("change-player-name");
        changeNameButton.id = `player-${1}`;
        changeNameButton.textContent = "Change";
        
        nameContainer.appendChild(nameLabel);
        nameContainer.appendChild(nameElement);
        nameContainer.appendChild(changeNameButton);

        playerContainer.appendChild(nameContainer);

        const boardContainer = BoardDisplayer.createBoard(playerBoardArray);

        playerContainer.appendChild(boardContainer);
        
        return playerContainer;
    }
}