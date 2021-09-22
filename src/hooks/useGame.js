import { useState, useEffect } from 'react';

/*
check consequences of player actions (tryCell and toggleFlag
or handleLeftClickOnCell and handleRightClickOnCell
according to situation)
test revealGrid in different setup to assure that it works properly
test victory, defeat, and playing conditions
*/
function useGame({
  initialGrid,
  generateGrid,
  rows,
  columns,
  mines,
}) {
  const [playGrid, setPlayGrid] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null)),
  );

  const [gameState, setGameState] = useState('playing');

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

  /**
   * Function to call when right click on cell
   * @param {event} event need event to prevent default behaviour
   * @param {int} rowIndex
   * @param {int} columnIndex
   * @returns {void}
   */
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
          return;
        }
      }
    }
    if (remainingCellCount === mines) {
      newState = 'victory';
    }
    setGameState(newState);
  };

  const revealGrid = () => {
    const newPlayGrid = [...playGrid];
    playGrid.forEach(((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === 'X') {
          newPlayGrid[rowIndex][columnIndex] = 'B';
        } else {
          newPlayGrid[rowIndex][columnIndex] = initialGrid[rowIndex][columnIndex];
        }
      });
    }));
    setPlayGrid(newPlayGrid);
  };

  /**
   * Reveal safe zone around safe cell located at rowIndex, columnIndex
   * @param {int} rowIndex
   * @param {int} columnIndex
   * @returns {void}
   */
  const revealZone = (rowIndex, columnIndex) => {
    const newPlayGrid = [...playGrid];

    let cellsToReveal = [[rowIndex, columnIndex]];
    let newCellsToReveal = [];
    let row;
    let column;

    const hasBeenChecked = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(false));

    do {
      newCellsToReveal = [];
      for (let i = 0; i < cellsToReveal.length; i += 1) {
        [row, column] = cellsToReveal[i];
        // reveal current cell
        newPlayGrid[row][column] = initialGrid[row][column];
        hasBeenChecked[row][column] = true;

        // search for adjacent cells to reveal
        if (row - 1 >= 0) {
          if (!hasBeenChecked[row - 1][column]) {
            if (initialGrid[row - 1][column] === 0) {
              // add top cell
              newCellsToReveal.push([row - 1, column]);
            } else {
              // limit number cell has been found
              newPlayGrid[row - 1][column] = initialGrid[row - 1][column];
            }
            hasBeenChecked[row - 1][column] = true;
          }
          if (column - 1 >= 0 && !hasBeenChecked[row - 1][column - 1]) {
            if (initialGrid[row - 1][column - 1] === 0) {
              // add top left hand corner cell
              newCellsToReveal.push([row - 1, column - 1]);
            } else {
              // limit number cell has been found
              newPlayGrid[row - 1][column - 1] = initialGrid[row - 1][column - 1];
            }
            hasBeenChecked[row - 1][column - 1] = true;
          }

          if (column + 1 < columns && !hasBeenChecked[row - 1][column + 1]) {
            if (initialGrid[row - 1][column + 1] === 0) {
              // add top right hand corner cell
              newCellsToReveal.push([row - 1, column + 1]);
            } else {
              // limit number cell has been found
              newPlayGrid[row - 1][column + 1] = initialGrid[row - 1][column + 1];
            }
            hasBeenChecked[row - 1][column + 1] = true;
          }
        }

        if (column - 1 >= 0 && !hasBeenChecked[row][column - 1]) {
          if (initialGrid[row][column - 1] === 0) {
            // add left cell
            newCellsToReveal.push([row, column - 1]);
          } else {
            // limit number cell has been found
            newPlayGrid[row][column - 1] = initialGrid[row][column - 1];
          }
          hasBeenChecked[row][column - 1] = true;
        }

        if (column + 1 < columns && !hasBeenChecked[row][column + 1]) {
          if (initialGrid[row][column + 1] === 0) {
            // add right cell
            newCellsToReveal.push([row, column + 1]);
          } else {
            // limit number cell has been found
            newPlayGrid[row][column + 1] = initialGrid[row][column + 1];
          }
          hasBeenChecked[row][column + 1] = true;
        }

        if (row + 1 < rows) {
          if (!hasBeenChecked[row + 1][column]) {
            if (initialGrid[row + 1][column] === 0) {
              // add bottom cell
              newCellsToReveal.push([row + 1, column]);
            } else {
              // limit number cell has been found
              newPlayGrid[row + 1][column] = initialGrid[row + 1][column];
            }
            hasBeenChecked[row + 1][column] = true;
          }

          if (column - 1 >= 0 && !hasBeenChecked[row + 1][column - 1]) {
            if (initialGrid[row + 1][column - 1] === 0) {
              // add bottom left hand cell
              newCellsToReveal.push([row + 1, column - 1]);
            } else {
              // limit number cell has been found
              newPlayGrid[row + 1][column - 1] = initialGrid[row + 1][column - 1];
            }
            hasBeenChecked[row + 1][column - 1] = true;
          }

          if (column + 1 < columns && !hasBeenChecked[row + 1][column + 1]) {
            if (initialGrid[row + 1][column + 1] === 0) {
              // add bottom right hand cell
              newCellsToReveal.push([row + 1, column + 1]);
            } else {
              // limit number cell has been found
              newPlayGrid[row + 1][column + 1] = initialGrid[row + 1][column + 1];
            }
            hasBeenChecked[row + 1][column + 1] = true;
          }
        }
      }
      // update cellsToReveal
      cellsToReveal = [...newCellsToReveal];
      // keep searching unless there are no more cells to reveal
    } while (cellsToReveal.length > 0);
    // update playGrid
    setPlayGrid(newPlayGrid);
  };

  /**
   * Reveal cell content located at rowIndex, columnIndex
   * @param {int} rowIndex
   * @param {int} columnIndex
   * @returns {void}
   */
  const revealCell = (rowIndex, columnIndex) => {
    const newPlayGrid = [...playGrid];
    const content = initialGrid[rowIndex][columnIndex];
    newPlayGrid[rowIndex][columnIndex] = content;
    setPlayGrid(newPlayGrid);
  };

  /**
   * Check content of cell at (rowIndex, columnIndex) in initGrid and change state of playGrid
   * @param {int} rowIndex
   * @param {int} columnIndex
   * @returns {int}
   */
  const tryCell = (rowIndex, columnIndex) => {
    const content = initialGrid[rowIndex][columnIndex];

    if (content === 0) {
      // reveal zone
      revealZone(rowIndex, columnIndex);
    } else {
      // revealCell
      revealCell(rowIndex, columnIndex);
    }
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

  const reset = () => {
    generateGrid(rows, columns, mines);
    setPlayGrid(Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null)));
    setGameState('playing');
  };

  useEffect(() => {
    reset();
  }, [rows, columns]);

  useEffect(() => {
    if (gameState === 'playing') {
      checkResult();
    }
  }, [playGrid]);

  useEffect(() => {
    if (gameState !== 'playing') {
      revealGrid();
    }
  }, [gameState]);

  return {
    playGrid,
    setPlayGrid,
    gameState,
    handleLeftClickOnCell,
    handleRightClickOnCell,
    tryCell,
    toggleFlag,
    checkResult,
    reset,
  };
}

export default useGame;
