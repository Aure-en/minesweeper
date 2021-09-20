import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import Cell from '../../components/Cell';
import '@testing-library/jest-dom';

test.each([
  [0],
  [1],
  [2],
])('Cell indicates number of adjacent mines', (content) => {
  render(<ThemeProvider><Cell content={content} /></ThemeProvider>);
  expect(screen.getByText(`${content}`)).toBeDefined();
});

test('Cell with flag', () => {
  render(<ThemeProvider><Cell content="F" x={0} y={0} /></ThemeProvider>);
  const cellWithFlag = screen.getByTitle('flag');
  expect(cellWithFlag).toBeInTheDocument();
});

test('Cell with mine', () => {
  render(<ThemeProvider><Cell content="X" x={0} y={0} /></ThemeProvider>);
  const cellWithMine = screen.getByTitle('mine');
  expect(cellWithMine).toBeInTheDocument();
});

test('Empty cell', () => {
  render(<ThemeProvider><Cell content={null} x={0} y={0} /></ThemeProvider>);
  const cell = document.querySelector('[data-x=\'0\'][data-y=\'0\']');
  expect(cell.textContent).toBeFalsy();
});
