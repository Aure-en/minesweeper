import React from 'react';
import useGame from '../hooks/useGame';
import Title from './Title';
import Message from './Message';
import Grid from './Grid';
import Stats from './Stats';
import Restart from './Restart';

function Game() {
  const {
    playGrid,
    gameState,
    reset,
    handleLeftClickOnCell,
    handleRightClickOnCell,
  } = useGame({
    rows: 16,
    columns: 14,
    mines: 40,
  });

  return (
    <div>
      <Title />
      <Message gameState={gameState} reset={reset} />
<<<<<<< HEAD
      <Grid grid={playGrid} />
      <Stats grid={playGrid} mines={40} />
=======
      <Grid
        grid={playGrid}
        onClick={(rowIndex, columnIndex) => handleLeftClickOnCell(rowIndex, columnIndex)}
        onContextMenu={
          (event, rowIndex, columnIndex) => handleRightClickOnCell(event, rowIndex, columnIndex)
        }
      />
>>>>>>> 0ff9372ad65c53d61545a0ce77cffd3f2319003e
      <Restart reset={reset} />
    </div>
  );
}

export default Game;
