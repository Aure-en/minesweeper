import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { ReactComponent as IconDark } from '../assets/theme/dark.svg';
import { ReactComponent as IconLight } from '../assets/theme/light.svg';

function Theme() {
  const { theme, changeTheme } = useTheme();

  return (
    <Button type="button" onClick={changeTheme}>
      { theme === 'dark'
        ? <IconDark /> : <IconLight />}
    </Button>
  );
}

export default Theme;

const Button = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text_primary};

  &:focus {
    outline: 2px solid transparent;
  }
`;
