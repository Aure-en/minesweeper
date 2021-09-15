import { useState, useEffect } from 'react';

function useStats({ grid, mines }) {
  const [flags, setFlags] = useState(''); // Number of flags the player put.
  const [toDiscover, setToDiscover] = useState(''); // % left of the grid to discover.
  const [minesLeft, setMinesLeft] = useState(''); // Number of mines left, assuming the flags are correct.

  // Calculate
  useEffect(() => {
    const flags = grid.flat().filter((cell) => cell === 'F').length;
    setFlags(flags);

    const toDiscover = Math.round((grid.flat().filter((cell) => cell !== null).length * 100)
      / grid.flat().length);
    setToDiscover(toDiscover);

    const minesLeft = mines - flags;
    setMinesLeft(minesLeft);
  }, [grid, mines]);

  return {
    flags,
    toDiscover,
    minesLeft,
  };
}

export default useStats;
