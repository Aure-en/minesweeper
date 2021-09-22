import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from '../../components/Title';
import '@testing-library/jest-dom';

test('It renders properly', () => {
  render(<Title />);
  expect(screen.getByRole('heading', { name: 'Minesweeper' })).toBeInTheDocument();
});
