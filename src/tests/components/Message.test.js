import { render, screen } from '@testing-library/react';
import Message from '../../components/Message';

test('Indicates victory message', () => {
  render(<Message status="win" />);
  expect(screen.getByRole('heading', { name: 'Victory' })).toBeInTheDocument();
});

test('Indicates loss message', () => {
  render(<Message status="lose" />);
  expect(screen.getByRole('heading', { name: 'Defeat' })).toBeInTheDocument();
});
