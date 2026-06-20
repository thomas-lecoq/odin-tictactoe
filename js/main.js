// main function
import { createPlayerRegistry } from "./players.js";
import { createGameBoard } from "./gameboard.js";

function init() {
    const playerRegistry = createPlayerRegistry()
    const players = playerRegistry.getPlayers();
    const board = createGameBoard();

    // simulate a game
    console.log(board.getBoard());
    board.setCell(players[0].playMove(0, 0));
    board.setCell(players[1].playMove(0, 1));
    board.setCell(players[0].playMove(0, 2));
    console.log(board.getBoard());
}

init();