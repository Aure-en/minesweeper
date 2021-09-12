import React from 'react';
import styled from 'styled-components';

function Cell({ adjacentMineCount, tested, type }) {
  return (
    <CellStyled type={type}>{ tested ? adjacentMineCount : '' }</CellStyled>
  );
}

const handleColor = (type) => {
  console.log(type);
  switch (type) {
    case 'untouched':
      return '#808080';
    case 'loose':
      return '#FF0000';
    case 'flagged':
      return '#fffff';
    default:
      return '#ADD8E6';
  }
};

const CellStyled = styled.div`
  display: flex;
  width: 10px;
  height: 10px;
  font-size: 0.5em;
  border: 1px solid black;
  background-color: ${(props) => handleColor(props.type)};
  margin: -1px 0 0 -1px;
`;

export default Cell;
