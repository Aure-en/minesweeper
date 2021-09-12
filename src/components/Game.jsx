import React from 'react';
import Grid from './Grid';

function Game() {
  return (
    <div>
      <Grid rows={16} columns={16} mines={40} />
    </div>
  );
}

export default Game;
