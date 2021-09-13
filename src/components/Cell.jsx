import React from 'react';
import styled from 'styled-components';

function Cell({ content, played, flagged, x, y }) {
  return (
    <CellStyled
      content={content}
      played={played}
      flagged={flagged}
      data-x={x}
      data-y={y}
    >
      {content}
    </CellStyled>
  );
}

const handleColor = (content, played, flagged) => {
  /*
  Colors correspondance
  untouched: #808080; !played && !flagged
  flagged: #fffff; flagged
  safe: #ADD8E6; played && content === Number.isNaN(content)
  loose: #FF0000; else
  */
  let color = '';
  if (flagged) {
    color = '#fffff';
  } else if (!played) {
    color = '#808080';
  } else if ((Number.isNaN(content))) {
    color = '#FF0000';
  } else {
    color = '#ADD8E6';
  }
  return color;
};

const CellStyled = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  font-size: 0.5em;
  border: 1px solid black;
  background-color: ${(props) => handleColor(props.content, props.played, props.flagged)};
  margin: -1px 0 0 -1px;
`;

export default Cell;
