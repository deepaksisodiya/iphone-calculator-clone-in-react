import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Header from '../Header';

describe('Header Component', () => {
  it('renders the time correctly', () => {
    const mockTime = '12:34';
    render(<Header time={mockTime} />);
    const timeElement = screen.getByText(mockTime);
    expect(timeElement).toBeInTheDocument();
  });

  it('renders the status icon', () => {
    render(<Header time="12:34" />);
    const statusIcon = screen.getByAltText('Status Icons');
    expect(statusIcon).toBeInTheDocument();
    expect(statusIcon).toHaveAttribute('src', '/status.png');
  });
});
