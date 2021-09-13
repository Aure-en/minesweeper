import React from 'react';
import useGrid from '../hooks/useGrid';
import Grid from './Grid';

function Game() {
  const { playGrid } = useGrid({ rows: 16, columns: 14, mines: 40 });
  return (
    <div>
      <Grid grid={playGrid} />
    </div>
  );
}

export default Game;
