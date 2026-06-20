import { createPlayerRegistry } from "./players.js";
import { createGameBoard } from "./gameboard.js";

// game related logic

export function playGame() {
    function checkWinningFigure(board, lastMoveRow, lastMoveCol, symbol) {
        const size = board.length; // board size
        const range = [...board.keys()]; // for future coordinates calc, equal for row & col
        const full = line => line.every(([r, c]) => board[r][c] === symbol); // true if all pairs pass the test

        // init a testedLines array
        const testedLines = [
            range.map(c => [lastMoveRow, c]), // each columns given the last played row
            range.map(r => [r, lastMoveCol]), // each rows given the last played column
        ];
        // test a diagonal when the last move sits on it
        if (lastMoveRow === lastMoveCol) testedLines.push(range.map(i => [i, i])); // main diag
        if (lastMoveRow + lastMoveCol === size - 1) testedLines.push(range.map(i => [i, size - 1 - i])); // anti diag
        
        // return true if, at least, one of the testedline is filled with symbol
        return testedLines.some(full);
    }

    // check if every cell of each row of the board is filled
    const checkBoardFilling = (board) => board.every(row => row.every(cell => cell !== null));

    // init the game
    const playerRegistry = createPlayerRegistry();
    const players = playerRegistry.getPlayers();
    const board = createGameBoard();

    // IIFE helper to switch turn
    const playerSelector = ((maxPlayers = players.length) => {
        let playerIndex = 0;

        const switchTurn = () => {playerIndex = playerIndex >= maxPlayers - 1 ? 0 : playerIndex + 1};
        const getCurrentPlayerIndex = () => playerIndex;

        return { switchTurn, getCurrentPlayerIndex };
    })();

    // play the game until the board is filled
    console.log(board.getBoard()); // first board display
    while (true) {
        const activePlayer = players[playerSelector.getCurrentPlayerIndex()];
        // keep asking the active player until they pick a free cell
        let move;
        do {
            move = activePlayer.playMove();
        } while (!board.setCell(move));
        // display last board state
        console.log(board.getBoard());
        // check winning figure for current player
        if (checkWinningFigure(board.getBoard(), move.row, move.col, move.symbol) === true) {
            // Set winner
            activePlayer.setWinner();
            break;
        }
        // check if the board is filled
        if (checkBoardFilling(board.getBoard()) === true) {
            // tie - final logic TBD
            console.log("tie");
            break
        }
        // if no winner and the board still have capacity, continue the game
        playerSelector.switchTurn();
    };
    // announce winner
    const gameWinner = playerRegistry.checkForWinner();
}