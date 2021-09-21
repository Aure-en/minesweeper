import React, { useState } from 'react';
import Modal from 'react-modal';
import GlobalStyles from './styles/global/globalStyles';
import { ThemeProvider } from './context/ThemeContext';
import Game from './components/Game';
import Settings from './components/settings/Settings';

function App() {
  const [settings, setSettings] = useState({
    name: 'intermediate',
    rows: 16,
    columns: 16,
    mines: 30,
  });

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Game
        rows={settings.rows}
        columns={settings.columns}
        mines={settings.mines}
      />
      <Settings settings={settings} setSettings={setSettings} />
    </ThemeProvider>
  );
}

Modal.setAppElement('#root');

export default App;
