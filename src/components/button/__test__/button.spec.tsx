import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, expect } from 'vitest';
import Button from '../Button';

describe('Button Component', () => {
  it('renders the button with the correct label', () => {
    const mockLabel = 'Click Me';
    render(<Button label={mockLabel} onClick={vi.fn()} type="number" />);
    const buttonElement = screen.getByText(mockLabel);
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the correct class based on the type prop', () => {
    const mockLabel = 'Click Me';
    render(<Button label={mockLabel} onClick={vi.fn()} type="operator" />);
    const buttonElement = screen.getByText(mockLabel);
    expect(buttonElement).toHaveClass('button operator');
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const mockLabel = 'Click Me';
    render(<Button label={mockLabel} onClick={handleClick} type="function" />);
    const buttonElement = screen.getByText(mockLabel);

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders the button with the correct "number zero" type', () => {
    const mockLabel = '0';
    render(<Button label={mockLabel} onClick={vi.fn()} type="number zero" />);
    const buttonElement = screen.getByText(mockLabel);
    expect(buttonElement).toHaveClass('button number zero');
  });
});
