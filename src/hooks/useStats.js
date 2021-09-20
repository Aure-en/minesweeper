import { useState, useEffect } from 'react';

function useStats({ grid, mines }) {
  const [minesToDiscover, setMinesToDiscover] = useState(''); // Number of mines to discover.
  const [percSafeCellsToDiscover, setPerSafeCellsToDiscover] = useState(''); // % of safe cells left.

  // Calculate
  useEffect(() => {
    const newMinesToDiscover = mines - grid.flat().filter((cell) => cell === 'F').length;
    setMinesToDiscover(newMinesToDiscover);

    const safeCells = grid[0].length * grid.length - mines;
    const safeCellsDiscovered = grid.flat().filter(
      (cell) => !Number.isNaN(parseInt(cell, 10)),
    ).length;
    const safeCellsToDiscover = safeCells - safeCellsDiscovered;
    const newPerSafeCellsToDiscover = (safeCellsToDiscover * 100) / safeCells;
    setPerSafeCellsToDiscover(newPerSafeCellsToDiscover.toFixed(1));
  }, [grid, mines]);

  return {
    minesToDiscover,
    percSafeCellsToDiscover,
  };
}

export default useStats;
