import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from './Cell';

function Grid({ grid, onClick, onContextMenu }) {
  return (
    <GridStyled $columnCount={grid[0].length}>
      {grid.map((row, rowIndex) => row.map((cell, cellIndex) => (
        <Cell
          key={`${rowIndex} ${cellIndex}`}
          x={rowIndex}
          y={cellIndex}
          content={cell}
          onClick={() => onClick(rowIndex, cellIndex)}
          onContextMenu={(event) => onContextMenu(event, rowIndex, cellIndex)}
        />
      )))}
    </GridStyled>
  );
}

Grid.defaultProps = {
  onClick: () => {},
  onContextMenu: () => {},
};

Grid.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['X', 'F', 'B', null]),
      ]),
    ),
  ).isRequired,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
};

const GridStyled = styled.div`
  display: grid;
  width: fit-content;
  grid-template-columns: repeat(${(props) => props.$columnCount}, 1fr);
  margin: 2rem 0;
  grid-gap: 3px;
  align-self: center;
`;

export default Grid;
