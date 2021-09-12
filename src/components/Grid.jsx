import React from 'react';
import useGrid from '../hooks/useGrid';
import Cell from "./Cell";

function Grid({ size, mines }) {
  const { grid } = useGrid({ size, mines });

  return (
    // Affiche la grille
  );
}

export default Grid;
