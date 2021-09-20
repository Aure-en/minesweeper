import React from 'react';
import GlobalStyles from './styles/global/globalStyles';
import { ThemeProvider } from './context/ThemeContext';
import Game from './components/Game';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Game />
    </ThemeProvider>
  );
}

export default App;
