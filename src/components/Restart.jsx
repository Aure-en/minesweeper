import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Restart({ reset }) {
  return (
    <Button type="button" onClick={reset}>Restart</Button>
  );
}

export default Restart;

Restart.propTypes = {
  reset: PropTypes.func.isRequired,
};

const Button = styled.button`
  background: ${(props) => props.theme.button_bg};
  color: ${(props) => props.theme.button_text};
  align-self: center;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.1s ease-out;

  &:hover {
    background: ${(props) => props.theme.button_bg_hover};
  }
`;
