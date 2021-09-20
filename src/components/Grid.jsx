import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from './Cell';

function Grid({ grid, onClick, onContextMenu }) {
  return (
    <GridStyled columnCount={grid[0].length}>
      { grid.map((row, rowIndex) => row.map((cell, cellIndex) => (
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
  x: null,
  y: null,
  grid: [[]],
  onClick: () => {},
  onContextMenu: () => {},
};

Grid.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['X', 'F', null])]))),
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
};

const GridStyled = styled.div`
  display: grid;
  width: ${(props) => `${props.columnCount * 30}px`};
  grid-template-columns: repeat(${(props) => props.columnCount}, 1fr);
  grid-gap: 0px 0px;
`;

export default Grid;
