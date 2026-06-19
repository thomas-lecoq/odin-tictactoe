// gameboard related logic

export function createGameBoard() {

    // board generation: 2D grid
    const [nRows, nCols] = [3, 3];
    const board = Array.from({ length: nRows }, () => 
        Array.from({length: nCols}, () => null)
    );

    const getBoard = () => board.map(row => [...row]);
    const getCell = (row, col) => board[row][col];
    const setCell = ({ row, col, symbol }) => {
        // if the cell is already taken, stop the operation
        if (getCell(row, col) !== null) return;
        // set the symbol for a defined cell
        board[row][col] = symbol;
    }

    return { getBoard, getCell, setCell }
}