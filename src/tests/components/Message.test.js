import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../../components/Message';
import '@testing-library/jest-dom';

test('Indicates victory message', () => {
  render(<Message gameState="victory" reset={() => {}} />);
  expect(screen.getByRole('heading', { name: 'Victory' })).toBeInTheDocument();
});

test('Indicates loss message', () => {
  render(<Message gameState="defeat" reset={() => {}} />);
  expect(screen.getByRole('heading', { name: 'Defeat' })).toBeInTheDocument();
});
