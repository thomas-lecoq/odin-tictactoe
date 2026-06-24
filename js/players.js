// players related logic

import { capitalizeFirstLetter } from "./utils.js";

export function createPlayerRegistry(declarations) {
    const maxPlayers = 2; // hard cap
    const players = [];

    const createPlayer = (name, symbol) => {
        let isWinner = false;
        const setWinner = () => (isWinner = true);
        const getWinner = () => isWinner;
        const getName = () => name;
        const getSymbol = () => symbol;

        return { getName, getSymbol, setWinner, getWinner }
    }

    const addPlayer = (name, symbol) => {
        // if max number of player is reach, throw error
        if (players.length >= maxPlayers) {
            throw new Error(`max player count (${maxPlayers}) is already reach.`);
        }
        // if a new player is created and match an already taken name, throw error
        if (players.some(p => p.getName() === name)) {
            throw new Error(`Player "${name}" already exist.`);
        }
        // if a new player is created and match an already taken symbol, throw error
        if (players.some(p => p.getSymbol() === symbol)) {
            throw new Error(`Player's symbol "${symbol}" is already taken.`);
        }

        const player = createPlayer(name, symbol);
        players.push(player);
      };

    const getPlayers = () => players;

    // check for winning players
    const checkForWinner = () => players.find(p => p.getWinner() === true);

    // declare every player from the provided { name, symbol } list
    declarations.forEach(({ name, symbol }) => addPlayer(capitalizeFirstLetter(name), symbol));

    return { getPlayers, checkForWinner };
  }
  