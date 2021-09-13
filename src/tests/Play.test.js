import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '../components/Game';

describe('Grid updates after a play', () => {
  beforeEach(() => {
    render(
      <Game />,
    );
  });

  test('The grid updates if the player selects a cell has hasn\'t selected yet', () => {
    // Cell contains nothing
    const firstCell = document.querySelector('[data-x=\'0\'][data-y=\'0\']');
    expect(firstCell.textContent).toBeFalsy();

    // After a click on the cell, it contains something.
    userEvent.click(firstCell);
    expect(firstCell.textContent).toBeTruthy();
  });

  test('Nothing happens if the player selects a cell he already selected', () => {
    // Cell contains nothing
    const firstCell = document.querySelector('[data-x=\'0\'][data-y=\'0\']');
    expect(firstCell.textContent).toBeFalsy();

    // After a click on the cell, it contains something.
    userEvent.click(firstCell);
    expect(firstCell.textContent).toBeTruthy();

    // Save the textContent
    const { textContent } = firstCell;

    // Clicks again and checks that the textContent has not changed.
    userEvent.click(firstCell);
    expect(firstCell.textContent).toBe(textContent);
  });
});
