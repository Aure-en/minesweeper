import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import useGrid from '../hooks/useGrid';

function Grid({ size, mines }) {
  // const { grid } = useGrid({ size, mines });
  const initialGrid = [
    ['X', 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ];
  const playGrid = [
    ['tested', 'untouched', 'tested'],
    ['tested', 'flagged', 'tested'],
    ['tested', 'tested', 'tested'],
  ];

  const gridElement = [];
  initialGrid.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const keyValue = rowIndex * size + columnIndex;
      const cellState = playGrid[rowIndex][columnIndex];
      const cellContent = initialGrid[rowIndex][columnIndex];
      let type;
      if (cellState !== 'tested') {
        type = cellState;
      } else if (cellContent === 'X') {
        type = 'loose';
      } else {
        type = 'safe';
      }

      gridElement.push(
        <Cell
          key={keyValue}
          tested={cellState === 'tested'}
          type={type}
          adjacentMineCount={!isNaN(initialGrid[rowIndex][columnIndex])
            ? initialGrid[rowIndex][columnIndex]
            : null}
        />,
      );
    });
  });

  return (
    <GridStyled size={size}>
      { gridElement }
    </GridStyled>
  );
}

const GridStyled = styled.div`
  display: grid;
  width: ${(props) => `${props.size * 2}px`};
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  grid-gap: 0px 0px;
`;

export default Grid;
