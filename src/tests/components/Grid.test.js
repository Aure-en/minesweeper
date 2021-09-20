import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import Grid from '../../components/Grid';

describe('Grid renders properly', () => {
  test('Empty grid', () => {
    const grid = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));

    render(
      <ThemeProvider>
        <Grid grid={grid} />
      </ThemeProvider>,
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
      <ThemeProvider>
        <Grid grid={grid} />
      </ThemeProvider>,
    );

    grid.forEach((row, rowIndex) => row.forEach((cell, colIndex) => {
      const cellElem = document.querySelector(`[data-x='${rowIndex}'][data-y='${colIndex}']`);
      switch (cell) {
        case 'X':
          expect(cellElem.textContent).toBe('mine');
          break;
        case 'F':
          expect(cellElem.textContent).toBe('flag');
          break;
        case null:
          expect(cellElem.textContent).toBeFalsy();
          break;
        default:
          expect(cellElem.textContent).toBe(String(cell));
      }
    }));
  });
});
