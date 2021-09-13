import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import useGrid from '../hooks/useGrid';

function Grid({ rows, columns, mines }) {
  const { grid } = useGrid({ rows, columns, mines });
  const gridElement = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const keyValue = rowIndex * row.length + cellIndex;
      const content = cell;
      const played = cell === null;
      const flagged = cell === 'F';
      gridElement.push(
        <Cell
          key={keyValue}
          content={content}
          played={played}
          flagged={flagged}
        />,
      );
    });
  });
  return (
    <GridStyled columnCount={columns}>
      { gridElement }
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
