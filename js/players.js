// players related logic

function createPlayerRegistry() {
    const maxPlayers = 2; // hard cap
    const players = [];

    const createPlayer = (name, symbol) => {
        const playMove = (row, col) => ({ row, col, symbol });
        return { name, symbol, playMove }
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

    return { addPlayer, getPlayers };
  }

  export { createPlayerRegistry };