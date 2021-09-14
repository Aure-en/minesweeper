import React, { useState } from 'react';
import useGame from '../hooks/useGame';
import Grid from './Grid';
import Restart from './Restart';

function Game() {
  const [gameState, setGameState] = useState('playing');
  const { playGrid, reset } = useGame({
    rows: 16,
    columns: 14,
    mines: 40,
    gameState,
    setGameState,
  });

  return (
    <div>
      <Grid grid={playGrid} />
      <Restart reset={reset} />
    </div>
  );
}

export default Game;
