// game related logic

import { createPlayerRegistry } from "./players.js";
import { createGameBoard } from "./gameboard.js";

export function playGame(playerDeclarations) {
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
    const playerRegistry = createPlayerRegistry(playerDeclarations);
    const players = playerRegistry.getPlayers();
    const board = createGameBoard();

    // IIFE helper to switch turn
    const playerSelector = ((maxPlayers = players.length) => {
        let playerIndex = 0;

        const switchTurn = () => {playerIndex = playerIndex >= maxPlayers - 1 ? 0 : playerIndex + 1};
        const getCurrentPlayerIndex = () => playerIndex;

        return { switchTurn, getCurrentPlayerIndex };
    })();

    let isOver = false;
    const getActivePlayer = () => players[playerSelector.getCurrentPlayerIndex()];

    /* Play a single turn for the active player at (row, col).
       Returns false when the move is rejected (cell taken or out of bounds
       or the game is already over) so the active player keeps the turn;
       otherwise applies the move, updates game state and returns true. */
    const playTurn = (row, col) => {
        if (isOver) return false;

        const activePlayer = getActivePlayer();
        const move = { row, col, symbol: activePlayer.getSymbol() };
        if (!board.setCell(move)) return false;

        if (checkWinningFigure(board.getBoard(), row, col, move.symbol)) {
            activePlayer.setWinner();
            isOver = true;
        } else if (isBoardFull(board.getBoard())) {
            isOver = true;
        } else {
            playerSelector.switchTurn();
        }

        return true;
    };

    return {
        playTurn,
        getBoard: board.getBoard,
        getActivePlayer,
        isOver: () => isOver,
        getWinner: playerRegistry.checkForWinner,
    };
}