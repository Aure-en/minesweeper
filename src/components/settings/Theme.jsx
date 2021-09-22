import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ReactComponent as IconDark } from '../../assets/theme/dark.svg';
import { ReactComponent as IconLight } from '../../assets/theme/light.svg';

function Theme() {
  const { theme, changeTheme } = useTheme();

  return (
    <Button type="button" onClick={changeTheme} aria-label="theme">
      { theme === 'dark'
        ? <IconDark /> : <IconLight />}
    </Button>
  );
}

export default Theme;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text_primary};

  &:focus {
    outline: 2px solid transparent;
  }
`;
