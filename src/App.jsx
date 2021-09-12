import React from 'react';
import Grid from './components/Grid';

function App() {
  return (
    <div className="App">
      <Grid size={3} mines={10} />
    </div>
  );
}

export default App;
