// gameboard related logic

export function createGameBoard() {

    // board generation: 2D grid
    const [nRows, nCols] = [3, 3];
    const board = Array.from({ length: nRows }, () => 
        Array.from({length: nCols}, () => null)
    );

    const getBoard = () => board;
    const getCell = (rowIdx, colIdx) => board[rowIdx][colIdx];
    const setCell = (rowIdx, colIdx, symbol) => {
        // if the cell is already taken, stop the operation
        if (getCell(rowIdx, colIdx) !== null) return;
        // set the symbol for a defined cell
        board[rowIdx][colIdx] = symbol;
    }

    return { getBoard, setCell }
}