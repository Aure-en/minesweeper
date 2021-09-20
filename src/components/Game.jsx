import React from 'react';
import styled from 'styled-components';
import useGame from '../hooks/useGame';
import Title from './Title';
import Message from './Message';
import Grid from './Grid';
import Stats from './Stats';
import Restart from './Restart';

function Game() {
  const mines = 30;
  const rows = 16;
  const columns = 16;
  const {
    playGrid,
    gameState,
    reset,
    handleLeftClickOnCell,
    handleRightClickOnCell,
  } = useGame({ rows, columns, mines });

  return (
    <Container>
      <Title />
      <Stats grid={playGrid} mines={mines} />
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
