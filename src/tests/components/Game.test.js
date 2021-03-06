import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../context/ThemeContext';
import Game from '../../components/Game';

test('Game can be restarted', () => {
  render(
    <ThemeProvider>
      <Game rows={3} columns={3} mines={5} />
    </ThemeProvider>,
  );

  // Make 1 play.
  const coords = { x: 0, y: 0 };
  const cellElem = document.querySelector(`[data-x='${coords.x}'][data-y='${coords.y}']`);
  userEvent.click(cellElem);
  expect(cellElem.textContent).toBeTruthy();

  // Reset, and expect the grid to be clean again.
  const resetBtn = screen.getByRole('button', { name: /restart/i });
  userEvent.click(resetBtn);
  expect(cellElem.textContent).toBeFalsy();
});
