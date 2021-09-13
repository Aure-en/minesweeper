import { render, screen } from '@testing-library/react';
import Title from '../../components/Title';

test('It renders properly', () => {
  render(<Title />);

  expect(screen.getByRole('heading', { name: 'Minesweeper' })).toBeInTheDocument();
});
