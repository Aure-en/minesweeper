import React from 'react';
import styled from 'styled-components';
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
    columns: 16,
    mines: 20,
  });

  return (
    <Container>
      <Title />
      <Stats grid={playGrid} mines={20} />
      <Grid
        grid={playGrid}
        onClick={(rowIndex, columnIndex) => handleLeftClickOnCell(rowIndex, columnIndex)}
        onContextMenu={
          (event, rowIndex, columnIndex) => handleRightClickOnCell(event, rowIndex, columnIndex)
        }
      />
      <Message gameState={gameState} reset={reset} />
      <Restart reset={reset} />
    </Container>
  );
}

export default Game;

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;
