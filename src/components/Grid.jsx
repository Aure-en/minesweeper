import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

function Grid({ grid }) {
  return (
    <GridStyled columnCount={grid[0].length}>
      { grid.map((row, rowIndex) => row.map((cell, cellIndex) => (
        <Cell
          key={`${rowIndex} ${cellIndex}`}
          x={rowIndex}
          y={cellIndex}
          content={content}
          played={played}
          flagged={flagged}
        />
      )))}
    </GridStyled>
  );
}

const GridStyled = styled.div`
  display: grid;
  width: ${(props) => `${props.columnCount * 30}px`};
  grid-template-columns: repeat(${(props) => props.columnCount}, 1fr);
  grid-gap: 0px 0px;
`;

export default Grid;
