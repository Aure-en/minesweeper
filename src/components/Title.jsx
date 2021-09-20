import React from 'react';
import styled from 'styled-components';

function Title() {
  return (
    <Header>
      <div>Let's play</div>
      <Heading>
        Minesweeper
      </Heading>
    </Header>
  );
}

export default Title;

const Header = styled.header`
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1rem;

  & > div {
    position: relative;
    left: -5rem;
    font-size: 1.75rem;
    line-height: 0.25;
  }
`;

const Heading = styled.h1`
  line-height: 3rem;
  color: ${(props) => props.theme.text_secondary};
`;
