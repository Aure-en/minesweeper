import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from './Title';
import Message from './Message';
import Grid from './Grid';
import Stats from './Stats';
import Restart from './Restart';
import useGrid from '../hooks/useGrid';
import useGame from '../hooks/useGame';

function Game({ rows, columns, mines }) {
  const { initialGrid, generateGrid } = useGrid({ rows, columns, mines });
  const {
    playGrid,
    gameState,
    reset,
    handleLeftClickOnCell,
    handleRightClickOnCell,
  } = useGame({
    initialGrid,
    generateGrid,
    rows,
    columns,
    mines,
  });

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

Game.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
};

export default Game;

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;
