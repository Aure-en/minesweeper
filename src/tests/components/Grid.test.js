import React from 'react';
import { render } from '@testing-library/react';
import Grid from '../components/Grid';

describe('Grid renders properly', () => {
  test('Empty grid', () => {
    const grid = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));

    render(
      <Grid grid={grid} />,
    );

    grid.forEach((row, rowIndex) => row.forEach((cell, colIndex) => {
      const cellElem = document.querySelector(`[data-x='${rowIndex}'][data-y='${colIndex}']`);
      expect(cellElem).toBeDefined();
      expect(cellElem.textContent).toBeFalsy();
    }));
  });

  test('Grid with various content', () => {
    const grid = [
      [2, 2, 1],
      ['X', 'F', 'F'],
      [null, 2, 0],
    ];

    render(
      <Grid grid={grid} />,
    );

    grid.forEach((row, rowIndex) => row.forEach((cell, colIndex) => {
      const cellElem = document.querySelector(`[data-x='${rowIndex}'][data-y='${colIndex}']`);
      if (cell !== null) {
        expect(cellElem.textContent).toBe(String(cell));
      } else {
        expect(cellElem.textContent).toBeFalsy();
      }
    }));
  });
});
