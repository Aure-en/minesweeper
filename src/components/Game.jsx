import React from 'react';
import useGame from '../hooks/useGame';
import Title from './Title';
import Message from './Message';
import Grid from './Grid';
import Stats from './Stats';
import Restart from './Restart';

function Game() {
  const mines = 2;
  const rows = 3;
  const columns = 3;
  const {
    playGrid,
    gameState,
    reset,
    handleLeftClickOnCell,
    handleRightClickOnCell,
  } = useGame({ rows, columns, mines });

  return (
    <div>
      <Title />
      <Message gameState={gameState} reset={reset} />
      <Grid
        grid={playGrid}
        onClick={(rowIndex, columnIndex) => handleLeftClickOnCell(rowIndex, columnIndex)}
        onContextMenu={
          (event, rowIndex, columnIndex) => handleRightClickOnCell(event, rowIndex, columnIndex)
        }
      />
      <Stats grid={playGrid} mines={mines} />
      <Restart reset={reset} />
    </div>
  );
}

export default Game;
