import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Message({ gameState, reset }) {
  if (gameState === 'victory') {
    return (
      <Container>
        <Heading $state="victory">Victory</Heading>
        <div>Congratulations, you have successfully located all the mines!</div>
        <Button type="button" onClick={reset}>Click here to play again.</Button>
      </Container>
    );
  }

  if (gameState === 'defeat') {
    return (
      <Container>
        <Heading $state="defeat">Defeat</Heading>
        <div>Oh no, you stepped on a mine and were blown to bits.</div>
        <Button type="button" onClick={reset}>Click here to play again.</Button>
      </Container>
    );
  }

  return (<></>);
}

export default Message;

Message.propTypes = {
  gameState: PropTypes.oneOf(['victory', 'defeat', 'playing']),
  reset: PropTypes.func.isRequired,
};

Message.defaultProps = {
  gameState: 'playing',
};

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${(props) => (props.$state === 'victory' ? props.theme.text_secondary : props.theme.text_tertiary)};
`;

const Button = styled.button`
  color: ${(props) => props.theme.text_secondary};
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid transparent;
  }
`;
