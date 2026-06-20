// players related logic

import { capitalizeFirstLetter } from "./utils.js";

export function createPlayerRegistry() {
    const maxPlayers = 2; // hard cap
    const players = [];

    const createPlayer = (name, symbol) => {
        let hasWon;
        const playMove = (row, col) => ({ row, col, symbol });
        const setWinner = () => (hasWon = true);
        const getWinner = () => hasWon;
        return { name, symbol, setWinner, getWinner, playMove }
    }

    const addPlayer = (name, symbol) => {
        // if max number of player is reach, throw error
        if (players.length >= maxPlayers) {
            throw new Error(`max player count (${maxPlayers}) is already reach.`);
        }
        // if a new player is created and match an already taken name, throw error
        if (players.some(p => p.name === name)) {
            throw new Error(`Player "${name}" already exist.`);
        }
        // if a new player is created and match an already taken symbol, throw error
        if (players.some(p => p.symbol === symbol)) {
            throw new Error(`Player's symbol "${symbol}" is already taken.`);
        }

        const player = createPlayer(name, symbol);
        players.push(player);
      };

    const getPlayers = () => players;

    // check for winning players
    const checkForWinner = () => players.find(p => p.getWinner() === true);

    // Force player declaration on playerRegistry init :
    for (let playerCount = 0; playerCount < maxPlayers; playerCount++ ) {
        const name = prompt(`Declare player ${playerCount + 1} name:`);
        const symbol = prompt(`Declare player ${playerCount + 1} symbol:`);
        addPlayer(capitalizeFirstLetter(name), symbol);
    }

    return { getPlayers, checkForWinner };
  }
  