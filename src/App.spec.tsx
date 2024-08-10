import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

vi.mock('./assets/react.svg', () => {
  return {
    default: () => <div>React Icon</div>
  };
});

const renderApp = () => {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
};

describe('App', () => {
  it('should display the navigation', async () => {
    await renderApp();
    expect(screen.getByText('React Template')).toBeInTheDocument();
  });
});
