import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Assets
import flag from '../assets/flag.svg';
import mine from '../assets/mine.svg';

function Cell({
  content, x, y, onClick, onContextMenu,
}) {
  return (
    <CellStyled
      content={content}
      data-x={x}
      data-y={y}
      $x={x}
      $y={y}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {content}
    </CellStyled>
  );
}

Cell.defaultProps = {
  content: 0,
  x: null,
  y: null,
  onClick: () => {},
  onContextMenu: () => {},
};

Cell.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['X', 'F', null]),
  ]),
  x: PropTypes.number,
  y: PropTypes.number,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
};

const CellStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.cell_border};
  margin: -1px 0 0 -1px;
  font-size: 1.25rem;
  cursor: pointer;

  color: ${(props) => {
    switch (props.content) {
      case 1:
        return props.theme.number_1;
      case 2:
        return props.theme.number_2;
      case 3:
        return props.theme.number_3;
      case 4:
        return props.theme.number_4;
      case 5:
        return props.theme.number_5;
      case 6:
        return props.theme.number_6;
      case 7:
        return props.theme.number_7;
      case 8:
        return props.theme.number_8;
      default:
        return 'transparent';
    }
  }};

  /**
   * Checkered grid.
   * Color depends on whether cell has been selected or not.
   */
  background-color: ${(props) => {
  // If the cell was selected
    if (props.content !== null && props.content !== 'F') {
      if ((props.$x % 2 === 0 && props.$y % 2 !== 0)
    || (props.$x % 2 !== 0 && props.$y % 2 === 0)) {
        return props.theme.cell_bg_selected_primary;
      }
      return props.theme.cell_bg_selected_secondary;
    }
    // If the cell is not selected
    if ((props.$x % 2 === 0 && props.$y % 2 !== 0)
    || (props.$x % 2 !== 0 && props.$y % 2 === 0)) {
      return props.theme.cell_bg_primary;
    }
    return props.theme.cell_bg_secondary;
  }};

  // Background image if there is a mine or a flag
  background-image: ${(props) => {
    if (props.content === 'X') {
      return `url(${mine})`;
    } if (props.content === 'F') {
      return `url(${flag})`;
    }
  }};

  background-position: center;
  background-repeat: no-repeat;

  &:hover {
    // Background color is brighter on hover.
    background-color: ${(props) => ((props.content !== null && props.content !== 'F')
    ? props.theme.cell_bg_hover
    : props.theme.cell_bg_hover_selected)};
  }
`;

export default Cell;
