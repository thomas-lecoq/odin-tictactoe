// main function
import { createGameBoard } from "./gameboard.js";

function init() {
    const board = createGameBoard();
    console.log(board.getBoard());
    board.setCell(0, 0, "X");
    board.setCell(0, 1, "X");
    board.setCell(0, 2, "X");
    console.log(board.getBoard());
}

init();