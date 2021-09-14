import React from 'react';
import useGame from '../hooks/useGame';
import Grid from './Grid';

function Game() {
  const {
    playGrid,
    gameState,
    handleLeftClickOnCell,
    handleRightClickOnCell,
  } = useGame({
    rows: 16,
    columns: 14,
    mines: 40,
  });

  return (
    <div>
      <Grid
        grid={playGrid}
        onClick={(rowIndex, columnIndex) => handleLeftClickOnCell(rowIndex, columnIndex)}
        onContextMenu={
          (event, rowIndex, columnIndex) => handleRightClickOnCell(event, rowIndex, columnIndex)
        }
      />
    </div>
  );
}

export default Game;
