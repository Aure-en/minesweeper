import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Cell({
  content,
  x,
  y,
  onClick,
  onContextMenu,
}) {
  return (
    <CellStyled
      content={content}
      data-x={x}
      data-y={y}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {content}
    </CellStyled>
  );
}

const handleColor = (content) => {
  /*
  Colors correspondance
  hiddden: #808080; null
  flagged: #fffff;  F
  safe: #ADD8E6; number
  die: #FF0000; X
  */
  let color = '';
  switch (content) {
    case 'F':
      color = '#fffff';
      break;
    case null:
      color = '#808080';
      break;
    case 'X':
      color = '#FF0000';
      break;
    default:
      color = '#ADD8E6';
      break;
  }
  return color;
};

Cell.defaultProps = {
  content: 0,
  x: null,
  y: null,
  onClick: () => {},
  onContextMenu: () => {},
};

Cell.propTypes = {
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['X', 'F', null])]),
  x: PropTypes.number,
  y: PropTypes.number,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
};

const CellStyled = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  font-size: 0.5em;
  border: 1px solid black;
  background-color: ${(props) => handleColor(props.content)};
  margin: -1px 0 0 -1px;
`;

export default Cell;
