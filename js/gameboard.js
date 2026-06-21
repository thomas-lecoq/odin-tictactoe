// Gameboard related logic

export function createGameBoard() {
    // board generation: 2D grid
    const [nRows, nCols] = [3, 3];
    const board = Array.from({ length: nRows }, () => 
        Array.from({length: nCols}, () => null)
    );
    const getBoard = () => board.map(row => [...row]);

    const getCell = (row, col) => board[row][col];

    // valid target: inside the grid and not yet played
    const isPlayable = (row, col) => (
        Number.isInteger(row) && row >= 0 && row < nRows &&
        Number.isInteger(col) && col >= 0 && col < nCols &&
        getCell(row, col) === null
    );

    const setCell = ({ row, col, symbol }) => {
        if (!isPlayable(row, col)) return false;
        board[row][col] = symbol;

        return true;
    }

    return { getBoard, getCell, setCell }
}
