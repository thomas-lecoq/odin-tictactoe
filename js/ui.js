// User interface related logic

import { playGame } from "./gamelogic.js";

export function initGame() {
    const form = document.querySelector("#players-form");
    const playerTwoName = form.querySelector('[name="player-two"]');
    const playerTwoSymbol = form.querySelector('[name="symbol-two"]');

    function initGameCommands() {
        // add grid, reset game commands and related listers
        const createGrid = (() => {
            const size = 3;
            const gameCtnr = document.querySelector("#game-ctnr");
            
            // create empty div: the board
            const board = document.createElement("div");
            board.classList.add("board");

            // add a button per cell: symbol holders
            // i runs 0..8 ; map it onto a 3x3 grid so each button knows its coordinates
            Array.from({ length: size * size }, (_, i) => {
                const cell = document.createElement("button");
                cell.type = "button";

                cell.classList.add("cell");
                cell.dataset.row = Math.floor(i / size); // add data-row to each button
                cell.dataset.col = i % size; // add data-col to each button
                
                return cell
            }).forEach(cell => board.append(cell));

            gameCtnr.appendChild(board);
        })();

        const createResetButton = (() => {
            const content = document.querySelector("#content");
            const reset = document.createElement("button");
            reset.id = "reset-btn";
            reset.classList.add("command-btn");
            reset.textContent = "Reset game";
            content.appendChild(reset);
        })();
    }
    
    function validatePlayersForm(event) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);
        const playerOneName = data.get("player-one");
        const playerTwoName = data.get("player-two");
        const playerTwoNameInput = form.querySelector('[name="player-two"]');
        const playerTwoSymbolInput = form.querySelector('[name="symbol-two"]');

        // boolean check : do players have the same name ?
        const sameName = (
            playerOneName.trim().toLowerCase()
            === playerTwoName.trim().toLowerCase()
        );
        // boolean check : do players have the same symbol ?
        const sameSymbol = (data.get("symbol-one") === data.get("symbol-two"));

        // if players have the same name or symbol: pop a message
        playerTwoNameInput.setCustomValidity(
            sameName ? "This name is already taken by player 1." : ""
        );
        playerTwoSymbolInput.setCustomValidity(
            sameSymbol ? "This symbol is already taken by player 1." : ""
        );

        // if the form is invalid: do not pursue the execution
        if (!form.reportValidity()) return;

        // if the form is valid - set game ui and start the game
        const players = [
            { name: playerOneName, symbol: data.get("symbol-one") },
            { name: playerTwoName, symbol: data.get("symbol-two") },
        ];
        form.remove();
        initGameCommands();
        startGame(players);
    }

    // add custom form validator to the targeted form
    form.addEventListener("submit", validatePlayersForm);

    // clear stale custom errors so a corrected field is never permanently blocked
    form.addEventListener("input", () => {
        playerTwoName.setCustomValidity("");
        playerTwoSymbol.setCustomValidity("");
    });
}

// paint every cell with its current symbol (or clear it when empty),
// coloring it with its owner's class so each player's symbol stands out
function renderBoard(state, symbolClass) {
    const board = document.querySelector(".board");
    board.querySelectorAll(".cell").forEach(cell => {
        const { row, col } = cell.dataset;
        const symbol = state[row][col];
        cell.textContent = symbol ?? "";
        cell.classList.remove("player-one-symbol", "player-two-symbol");
        if (symbol) cell.classList.add(symbolClass[symbol]);
    });
}

// update the instructions line to reflect whose turn it is or the outcome
function announce(message) {
    document.querySelector("#instructions").textContent = message;
}

// drive a playable game: render the board, play a turn per cell click,
// and let the reset button start a new game with the same players
function startGame(players) {
    const board = document.querySelector(".board");
    const resetButton = document.querySelector("#reset-btn");
    
    // map each player's symbol to the class that colors it
    const symbolClass = {
        [players[0].symbol]: "player-one-symbol",
        [players[1].symbol]: "player-two-symbol",
    };

    let game;

    const render = () => {
        renderBoard(game.getBoard(), symbolClass);
        if (!game.isOver()) return announce(`${game.getActivePlayer().getName()}'s turn`);
        const winner = game.getWinner();
        announce(winner ? `${winner.getName()} won the game !` : "It's a tie !");
    };

    const newGame = () => {
        game = playGame(players);
        render();
    };

    board.addEventListener("click", event => {
        const cell = event.target.closest(".cell");
        if (!cell || game.isOver()) return;
        // a rejected move (cell already taken) leaves the board untouched
        if (game.playTurn(Number(cell.dataset.row), Number(cell.dataset.col))) render();
    });

    resetButton.addEventListener("click", newGame);

    newGame();
}