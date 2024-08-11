import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Calculator from '../Calculator';

describe('Calculator Component', () => {
  let getButton: (label: string) => HTMLElement;
  beforeEach(async () => {
    await render(<Calculator />);
    getButton = (label: string) => screen.getByText(label);
  });

  it('renders the initial display with 0', async () => {
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('allows the user to input numbers', () => {
    fireEvent.click(getButton('1'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('3'));
    const displayElement = screen.getByText('123');
    expect(displayElement).toBeInTheDocument();
  });

  it('performs addition correctly', () => {
    fireEvent.click(getButton('1'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('+'));
    fireEvent.click(getButton('3'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('15');
  });

  it('performs subtraction correctly', () => {
    fireEvent.click(getButton('9'));
    fireEvent.click(getButton('−'));
    fireEvent.click(getButton('4'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('5');
  });

  it('performs multiplication correctly', () => {
    fireEvent.click(getButton('6'));
    fireEvent.click(getButton('×'));
    fireEvent.click(getButton('7'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('42');
  });

  it('performs division correctly', () => {
    fireEvent.click(getButton('8'));
    fireEvent.click(getButton('÷'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('4');
  });

  it('handles percentage calculations correctly', () => {
    fireEvent.click(getButton('5'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('%'));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('0.5');
  });

  it('handles percentage calculations correctly for with addition', () => {
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('+'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('%'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('240');
  });

  it('handles percentage calculations correctly with subtraction', () => {
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('−'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('%'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('160');
  });

  it('handles percentage calculations correctly division', () => {
    fireEvent.click(getButton('1'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('×'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('%'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('20');
  });

  it('handles percentage calculations correctly division', () => {
    fireEvent.click(getButton('1'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('÷'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('%'));
    fireEvent.click(getButton('='));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('500');
  });

  it('toggles the sign correctly', () => {
    fireEvent.click(getButton('7'));
    fireEvent.click(getButton('+/-'));
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('-7');
    fireEvent.click(getButton('+/-'));
    expect(displayEl).toHaveTextContent('7');
  });

  it('clears the display correctly', () => {
    const displayEl = screen.getByTestId('display');
    expect(displayEl).toHaveTextContent('0');
    fireEvent.click(getButton('9'));
    expect(displayEl).toHaveTextContent('9');
    fireEvent.click(getButton('C'));
    expect(displayEl).toHaveTextContent('0');
  });

  it('limits input to 10 digits', () => {
    const digits = '1234567890'.split('');
    digits.forEach(digit => fireEvent.click(getButton(digit)));
    const displayElement = screen.getByText('1234567890');
    expect(displayElement).toBeInTheDocument();
    fireEvent.click(getButton('1'));
    expect(displayElement).toHaveTextContent('1234567890');
  });

  it('adjusts font size for long inputs', async () => {
    const digits = '1234567'.split('');
    digits.forEach(digit => fireEvent.click(getButton(digit)));
    const displayElement = screen.getByText('1234567');
    expect(displayElement).toHaveStyle('font-size: 80px');
    await fireEvent.click(getButton('8'));
    await fireEvent.click(getButton('9'));
    expect(displayElement).toHaveStyle('font-size: 60px');
    await fireEvent.click(getButton('0'));
    expect(displayElement).toHaveStyle('font-size: 50px');
  });
});
