import React from 'react';
import useGrid from '../hooks/useGrid';
import Cell from './Cell';

function Grid({ rows, columns, mines }) {
  const { grid } = useGrid({ rows, columns, mines });

  return (
    // Affiche la grille
    <></>
  );
}

export default Grid;
