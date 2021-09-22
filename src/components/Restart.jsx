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
  border: 1px solid ${(props) => props.theme.button};
  color: ${(props) => props.theme.button};
  background: transparent;
  align-self: center;
  padding: 0.4rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.1s ease-out;

  &:hover {
    border: 1px solid ${(props) => props.theme.button_hover};
    color: ${(props) => props.theme.button_hover};
  }
`;
