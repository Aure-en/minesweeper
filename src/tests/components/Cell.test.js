import React from 'react';
import { render, screen } from '@testing-library/react';
import Cell from '../../components/Cell';

test.each([
  ['X'],
  ['F'],
  [0],
  [1],
])('Cell indicates its content', (content) => {
  render(<Cell content={content} />);
  expect(screen.getByText(`${content}`)).toBeDefined();
});

test('Empty cell', () => {
  render(<Cell content={null} x={0} y={0} />);
  const cell = document.querySelector('[data-x=\'0\'][data-y=\'0\']');
  expect(cell.textContent).toBeFalsy();
});
