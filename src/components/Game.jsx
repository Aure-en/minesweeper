import React from 'react';
import useGame from '../hooks/useGame';
import Grid from './Grid';
import Title from './Title';
import Message from './Message';
import Restart from './Restart';

function Game() {
  const { playGrid, reset, gameState } = useGame({
    rows: 16,
    columns: 14,
    mines: 40,
  });

  return (
    <div>
      <Title />
      <Message gameState={gameState} reset={reset} />
      <Grid grid={playGrid} />
      <Restart reset={reset} />
    </div>
  );
}

export default Game;
