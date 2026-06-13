// gameboard related logic

export function createGameBoard() {

    // board generation: 2D grid
    const [nRows, nCols] = [3, 3];
    const board = Array.from({ length: nRows }, () => 
        Array.from({length: nCols}, () => [])
    );
    return board
}