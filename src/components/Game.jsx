import React from 'react';
import useGame from '../hooks/useGame';
import Title from './Title';
import Message from './Message';
import Grid from './Grid';
import Stats from './Stats';
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
      <Stats grid={playGrid} mines={40} />
      <Restart reset={reset} />
    </div>
  );
}

export default Game;
