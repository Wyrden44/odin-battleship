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

    static markShipCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos.row}"][data-col="${cellPos.col}"]`);
        cell.classList.add("ship");
    }

    static markShipCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos.row}"][data-col="${cellPos.col}"]`);
        cell.classList.add("ship-hit");
    }

    static markShipDestroyedCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos.row}"][data-col="${cellPos.col}"]`);
        cell.classList.add("ship-destroyed");
    }

    static markMissCell(boardContainer, cellPos) {
        const cell = boardContainer.querySelector(`.board-cell[data-row="${cellPos.row}"][data-col="${cellPos.col}"]`);
        cell.classList.add("miss");
    }
}