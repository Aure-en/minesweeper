import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Stats from '../../components/Stats';

describe('It renders properly', () => {
  let mines;
  let flags;
  let toDiscover;

  beforeEach(() => {
    const grid = [
      ['F', 1, 0],
      [1, null, null],
      [null, null, null],
    ];

    mines = 3;
    flags = grid.flat().filter((cell) => cell === 'F').length;
    const safeCells = grid[0].length * grid.length - mines;
    const safeCellsDiscovered = grid.flat().filter(
      (cell) => !Number.isNaN(parseInt(cell, 10)),
    ).length;
    const safeCellsToDiscover = safeCells - safeCellsDiscovered;
    const newPerSafeCellsToDiscover = (safeCellsToDiscover * 100) / safeCells;
    toDiscover = newPerSafeCellsToDiscover.toFixed(1);

    render(
      <ThemeProvider>
        <Stats grid={grid} mines={mines} />
      </ThemeProvider>,
    );
  });

  test('Renders the number of leftover flags', () => {
    expect(screen.getByText(`${mines - flags}`)).toBeInTheDocument();
  });

  test('Renders the % of discovered board', () => {
    expect(screen.getByText(`${toDiscover}%`)).toBeInTheDocument();
  });
});
