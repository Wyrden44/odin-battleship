import { GRID_SIZE } from "../utils/settings";
import PlayerDisplayer from "./playerDisplayer";

export default class BoardDisplayer {
    static createBoard(boardArray) {
        const boardContainer = document.createElement("div");
        boardContainer.classList.add("board-container");

        boardArray.forEach((row, rowIndex) => {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("board-row");
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("board-cell");
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = colIndex;
                rowDiv.appendChild(cellDiv);
            });
            boardContainer.appendChild(rowDiv);
        });
        return boardContainer;
    }

    static redisplayShips(boardNumber, ships) {
        const player = document.querySelector(`.player-${boardNumber}-container`);
        const boardContainer = player.querySelector(".board-container");
        this.getAllCells(boardNumber).forEach(cell => {
            let pos = [+cell.getAttribute("data-row"), +cell.getAttribute("data-col")];
            this.unmarkCell(boardContainer, pos)
        });
        ships.forEach(ship => {
            for (let pos of ship.getAllSquarePositions()) {
                this.markShipCell(boardContainer, pos);
            }
        });
    }

    static clearShipPreview(boardNumber) {
        console.log(`.player-${boardNumber}-container>.board-container`);
        const boardElement = document.querySelector(`.player-${boardNumber}-container>.board-container`);
        const cells = boardElement.querySelectorAll(".board-cell");
        for (let cell of cells) {
            this.removeShipPreviewCell(cell);
        }
    }

    static displayShipPreview(boardNumber, row, col, shipSize) {
        if (col+shipSize <= GRID_SIZE) {
            const boardElement = document.querySelector(`.player-${boardNumber}-container>.board-container`);
            for (let i=0; i<shipSize; i++) {
                // select all cells to be displayed
                const shipCell = boardElement.querySelector(`.board-cell[data-row="${row}"][data-col="${col+i}"]`);
                this.markShipPreviewCell(shipCell);
            }
        }
    }

    static getAllCells(boardNumber) {
        return document.querySelector(`.player-${boardNumber}-container`).querySelectorAll(".board-cell");
    }

    static unmarkCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos[0]}"][data-col="${cellPos[1]}"]`);
        while (cell.classList.length > 0) {
            cell.classList.remove(cell.classList[0]);
        }
        cell.classList.add("board-cell");
    }

    static markShipCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos[0]}"][data-col="${cellPos[1]}"]`);
        cell.classList.add("ship");
    }

    static markShipHitCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos[0]}"][data-col="${cellPos[1]}"]`);
        cell.classList.add("ship-hit");
    }

    static markShipDestroyedCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos[0]}"][data-col="${cellPos[1]}"]`);
        cell.classList.add("ship-destroyed");
    }

    static markMissCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos[0]}"][data-col="${cellPos[1]}"]`);
        cell.classList.add("miss");
    }

    static markShipPreviewCell(cell) {
        cell.classList.add("ship-preview");
    }

    static removeShipPreviewCell(cell) {
        cell.classList.remove("ship-preview");
    }
}