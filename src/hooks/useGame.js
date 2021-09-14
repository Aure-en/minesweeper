import { useState, useEffect } from 'react';

function useGame({ rows, columns, mines }) {
  const [playGrid, setPlayGrid] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null)),
  );
  const [initialGrid, setInitialGrid] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null)),
  );
  const [gameState, setGameState] = useState('playing');

  const generateCoords = (rows, columns) => {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * columns);
    return { x, y };
  };

  /**
   * Check if there is already a mine on a cell
   * @param {array} grid (2 dimensional-array representing the game grid) ;
   * @param {object} cell ({ x, y }) - Cell position ;
   * @returns {boolean} true if the cell is available, false otherwise.
   */
  const checkAvailable = (grid, cell) => {
    if (grid[cell.x][cell.y]) {
      return false;
    }
    return true;
  };

  const addMineToCell = (grid, cell) => {
    const gridWithCell = [...grid];
    gridWithCell[cell.x][cell.y] = 'X';
    return gridWithCell;
  };

  /**
   * For each mine, coordinates are generated until we land on an empty cell.
   * The mine is then added to the empty cell.
   * @param {array} grid (2 dimensional-array representing the game grid)
   * @param {int} mines Number of mines
   * @returns {array} Grid filled with mines.
   */
  const addMinesToGrid = (grid, mines) => {
    const gridWithMines = [...grid];

    for (let i = 0; i < mines; i += 1) {
      let cellCoords = generateCoords(grid.length, grid[0].length);

      while (!checkAvailable(gridWithMines, cellCoords)) {
        cellCoords = generateCoords(grid.length, grid[0].length);
      }

      addMineToCell(gridWithMines, cellCoords);
    }

    return gridWithMines;
  };

  /**
   * For each cell, count the number of adjacent mines and store it.
   * @param {array} grid (2 dimensional-array representing the game grid, with its mines)
   * @returns {array} Grid filled with both mines and numbers
   * or null if there are no adjacent mines.
   */
  const addNumbersToGrid = (gridWithMines) => {
    const gridWithNumbers = [...gridWithMines];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        // If the grid does not contain a mine, count the number of adjacent mines and store it.
        if (gridWithNumbers[row][column] !== 'X') {
          let adjacentMines = 0;

          // Left
          if (column > 0 && gridWithNumbers[row][column - 1] === 'X') {
            adjacentMines += 1;
          }

          // Right
          if (
            column < gridWithNumbers[0].length - 1
            && gridWithNumbers[row][column + 1] === 'X'
          ) {
            adjacentMines += 1;
          }

          // Top
          if (row > 0 && gridWithNumbers[row - 1][column] === 'X') {
            adjacentMines += 1;
          }

          // Bottom
          if (
            row < gridWithNumbers.length - 1
            && gridWithNumbers[row + 1][column] === 'X'
          ) {
            adjacentMines += 1;
          }

          // Top-left
          if (
            row > 0
            && column > 0
            && gridWithNumbers[row - 1][column - 1] === 'X'
          ) {
            adjacentMines += 1;
          }

          // Top-right
          if (
            row > 0
            && column < gridWithNumbers[0].length - 1
            && gridWithNumbers[row - 1][column + 1] === 'X'
          ) {
            adjacentMines += 1;
          }

          // Bottom-left
          if (
            row < gridWithNumbers.length - 1
            && column > 0
            && gridWithNumbers[row + 1][column - 1] === 'X'
          ) {
            adjacentMines += 1;
          }

          // Bottom-right
          if (
            row < gridWithNumbers.length - 1
            && column < gridWithNumbers[0].length - 1
            && gridWithNumbers[row + 1][column + 1]
          ) {
            adjacentMines += 1;
          }

          gridWithNumbers[row][column] = adjacentMines;
        }
      }
    }

    return gridWithNumbers;
  };

  /**
   * Function to call when left click on cell
   * @param {int} rowIndex
   * @param {int} columnIndex
   * @returns {void}
   */
  const toggleFlag = (isFlagged, rowIndex, columnIndex) => {
    const newPlayGrid = [...playGrid];
    newPlayGrid[rowIndex][columnIndex] = isFlagged ? null : 'F';
    setPlayGrid(newPlayGrid);
  };

  const handleRightClickOnCell = (event, rowIndex, columnIndex) => {
    event.preventDefault();
    const content = playGrid[rowIndex][columnIndex];
    const isFlagged = content === 'F';
    if (gameState === 'playing' && (isFlagged || content === null)) {
      toggleFlag(isFlagged, rowIndex, columnIndex);
    }
  };

  /**
   * Update gameState (victory/defeat/playing)
   * @returns {void}
   */
  const checkResult = () => {
    let newState = 'playing';
    let remainingCellCount = 0;
    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
        const content = playGrid[rowIndex][columnIndex];
        if (content === 'F' || content === null) {
          // Count cells that weren't tested
          remainingCellCount += 1;
        } else if (content === 'X') {
          newState = 'defeat';
          setGameState(newState);
          window.alert('defeat');
          return;
        }
      }
    }
    if (remainingCellCount === mines) {
      newState = 'victory';
      window.alert('victory');
    }
    setGameState(newState);
  };

  /**
   * Check content of cell at (rowIndex, columnIndex) in initGrid and change state of playGrid
   * @param {int} rowIndex
   * @param {int} columnIndex
   * @returns {int}
   */
  const tryCell = (rowIndex, columnIndex) => {
    const newPlayGrid = [...playGrid];
    const content = initialGrid[rowIndex][columnIndex];
    newPlayGrid[rowIndex][columnIndex] = content;
    setPlayGrid(newPlayGrid);
    checkResult();
  };

  /**
   * Function to call when left click on cell
   * @param {int} rowIndex
   * @param {int} columnIndex
   * @returns {void}
   */
  const handleLeftClickOnCell = (rowIndex, columnIndex) => {
    if (gameState !== 'playing' || playGrid[rowIndex][columnIndex] !== null) {
      return;
    }
    tryCell(rowIndex, columnIndex);
  };

  useEffect(() => {
    const emptyGrid = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null));
    const gridWithMines = addMinesToGrid(emptyGrid, mines);
    const gridWithNumbers = addNumbersToGrid(gridWithMines);
    setInitialGrid(gridWithNumbers);
  }, []);

  return {
    playGrid,
    gameState,
    handleLeftClickOnCell,
    handleRightClickOnCell,
  };
}

export default useGame;
