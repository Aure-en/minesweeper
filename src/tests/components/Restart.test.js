import { render, screen } from '@testing-library/react';
import Title from '../../components/Restart';

test('It renders properly', () => {
  render(<Restart />);

  expect(screen.getByRole('button', { name: 'Restart' })).toBeInTheDocument();
});
