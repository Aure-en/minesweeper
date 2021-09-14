import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from './Cell';

function Grid({ grid }) {
  return (
    <GridStyled columnCount={grid[0].length}>
      { grid.map((row, rowIndex) => row.map((cell, cellIndex) => (
        <Cell
          key={`${rowIndex} ${cellIndex}`}
          x={rowIndex}
          y={cellIndex}
          content={cell}
          played={cell !== null}
          flagged={cell === 'F'}
        />
      )))}
    </GridStyled>
  );
}

Grid.defaultProps = {
  grid: [[null]],
};

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['X', 'F', null])]))),
};

const GridStyled = styled.div`
  display: grid;
  width: ${(props) => `${props.columnCount * 30}px`};
  grid-template-columns: repeat(${(props) => props.columnCount}, 1fr);
  grid-gap: 0px 0px;
`;

export default Grid;
