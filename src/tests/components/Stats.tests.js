import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    flags = grid.flat().filter((cell) => cell === 'F');
    toDiscover = Math.floor(
      (grid.flat().filter((cell) => cell === null).length * 100)
        / grid.flat().length,
    );

    render(<Stats grid={grid} mines={mines} />);
  });

  test('Renders the number of flags the user put', () => {
    expect(screen.getByText(`Flags: ${flags}`).toBeInTheDocument());
  });

  test('Renders the number of leftover flags', () => {
    expect(
      screen.getByText(`Unsweeped Mines: ${mines - flags}`).toBeInTheDocument(),
    );
  });

  test('Renders the % of discovered board', () => {
    expect(screen.getAllByText(`To be discovered: ${toDiscover}%`).toBeInTheDocument());
  });
});
