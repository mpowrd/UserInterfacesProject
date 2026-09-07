import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './i18n';

test('renders the Eurodle menu', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: /guess the song|adivina la canción/i })).toBeInTheDocument();
});
