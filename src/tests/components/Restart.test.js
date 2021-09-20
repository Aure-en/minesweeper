import React from 'react';
import { render, screen } from '@testing-library/react';
import Restart from '../../components/Restart';
import '@testing-library/jest-dom';

test('It renders properly', () => {
  render(<Restart reset={() => {}} />);

  expect(screen.getByRole('button', { name: 'Restart' })).toBeInTheDocument();
});
