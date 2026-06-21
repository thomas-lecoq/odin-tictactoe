// game related logic

import { createPlayerRegistry } from "./players.js";
import { createGameBoard } from "./gameboard.js";

export function playGame() {
    function checkWinningFigure(board, lastMoveRow, lastMoveCol, symbol) {
        const size = board.length; // board size
        const range = [...board.keys()];

        const isCoordinatesEqualToSymbol = ([r, c]) => board[r][c] === symbol;
        const isLineFilledWithSymbol = line => line.every(isCoordinatesEqualToSymbol);
        const adjacentLines = [
            range.map(c => [lastMoveRow, c]), // every columns matching the last move row
            range.map(r => [r, lastMoveCol]), // every rows matching the last move column
        ];
        // test diagonals when the last move sits on it
        if (lastMoveRow === lastMoveCol) adjacentLines.push(range.map(i => [i, i]));
        if (lastMoveRow + lastMoveCol === size - 1) adjacentLines.push(range.map(i => [i, size - 1 - i]));
        
        // return true if at least one of the adjacentLines is filled with same symbol
        return adjacentLines.some(isLineFilledWithSymbol);
    }

    const isBoardFull = (board) => board.every(row => row.every(cell => cell !== null));

    // Init the game
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

    // Play the game until the board is full or a winner is declared
    let continueGame = true;
    console.log(board.getBoard()); // empty board display - TBD
    while (continueGame) {
        /* Until the board is filled of a winner is declared, play the game : 
            ask for a valid move,
            check winning figure after each move,
            check if the board is filled,
            if there is no winner and a cell is free: switch turn.
        */
        const activePlayer = players[playerSelector.getCurrentPlayerIndex()];
        let move;
        do {
            move = activePlayer.playMove();
        } while (!board.setCell(move));
        console.log(board.getBoard()); // display last board state - TBD
        if (checkWinningFigure(board.getBoard(), move.row, move.col, move.symbol)) {
            activePlayer.setWinner();
            continueGame = false;
        }
        if (isBoardFull(board.getBoard())) {
            console.log("No winner: Tie"); // tie declaration - final logic TBD
            continueGame = false;
        }
        playerSelector.switchTurn();
    };
    // announce winner
    const winner = playerRegistry.checkForWinner();
    console.log(`${winner.name} won the game`); // winner declaration - final logic TBD
}