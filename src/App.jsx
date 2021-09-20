import React from 'react';
import GlobalStyles from './styles/global/globalStyles';
import { ThemeProvider } from './context/ThemeContext';
import Game from './components/Game';
import Theme from './components/Theme';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Game />
      <Theme />
    </ThemeProvider>
  );
}

export default App;
