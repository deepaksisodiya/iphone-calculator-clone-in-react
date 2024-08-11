import { describe, it, expect } from 'vitest';
import { formatTime, toggleSign, evaluateExpression, handlePercentage } from '../calculatorUtils';

describe('formatTime', () => {
  it('formats time correctly for morning hours (AM)', () => {
    const date = new Date('2024-01-01T09:30:00'); // 9:30 AM
    const formattedTime = formatTime(date);
    expect(formattedTime).toBe('9:30');
  });

  it('formats time correctly for afternoon hours (PM)', () => {
    const date = new Date('2024-01-01T15:45:00'); // 3:45 PM
    const formattedTime = formatTime(date);
    expect(formattedTime).toBe('3:45');
  });

  it('formats time correctly for midnight', () => {
    const date = new Date('2024-01-01T00:00:00'); // 12:00 AM
    const formattedTime = formatTime(date);
    expect(formattedTime).toBe('12:00');
  });

  it('formats time correctly for noon', () => {
    const date = new Date('2024-01-01T12:00:00'); // 12:00 PM
    const formattedTime = formatTime(date);
    expect(formattedTime).toBe('12:00');
  });

  it('formats time correctly with single-digit minutes', () => {
    const date = new Date('2024-01-01T10:05:00'); // 10:05 AM
    const formattedTime = formatTime(date);
    expect(formattedTime).toBe('10:05');
  });
});

describe('toggleSign', () => {
  it('removes the negative sign from a negative number', () => {
    const currentValue = '-123';
    const toggledValue = toggleSign(currentValue);
    expect(toggledValue).toBe('123');
  });

  it('adds a negative sign to a positive number', () => {
    const currentValue = '123';
    const toggledValue = toggleSign(currentValue);
    expect(toggledValue).toBe('-123');
  });

  it('adds a negative sign to zero', () => {
    const currentValue = '0';
    const toggledValue = toggleSign(currentValue);
    expect(toggledValue).toBe('-0');
  });

  it('removes the negative sign from "-0"', () => {
    const currentValue = '-0';
    const toggledValue = toggleSign(currentValue);
    expect(toggledValue).toBe('0');
  });

  it('toggles sign on a number with decimal places', () => {
    const currentValue = '123.45';
    const toggledValue = toggleSign(currentValue);
    expect(toggledValue).toBe('-123.45');
  });

  it('removes the negative sign from a negative number with decimal places', () => {
    const currentValue = '-123.45';
    const toggledValue = toggleSign(currentValue);
    expect(toggledValue).toBe('123.45');
  });
});

describe('evaluateExpression', () => {
  it('evaluates a simple addition expression', () => {
    const expressionArray = [1, '+', 2];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(3);
  });

  it('evaluates a simple subtraction expression', () => {
    const expressionArray = [5, '-', 3];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(2);
  });

  it('evaluates a multiplication expression', () => {
    const expressionArray = [4, '*', 5];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(20);
  });

  it('evaluates a division expression', () => {
    const expressionArray = [10, '/', 2];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(5);
  });

  it('handles mixed operations with correct precedence', () => {
    const expressionArray = [2, '+', 3, '*', 4];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(14); // 2 + (3 * 4)
  });

  it('returns an error for an invalid expression', () => {
    const expressionArray = [2, '+', '*', 3];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe('Error');
  });

  it('evaluates an expression with negative numbers', () => {
    const expressionArray = [-3, '+', 7];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(4);
  });

  it('evaluates an expression with decimals', () => {
    const expressionArray = [5.5, '*', 2];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(11);
  });

  it('handles division by zero', () => {
    const expressionArray = [10, '/', 0];
    const result = evaluateExpression(expressionArray);
    expect(result).toBe(Infinity); // Division by zero returns Infinity in JavaScript
  });
});

describe('handlePercentage', () => {
  it('calculates percentage for addition', () => {
    const expression = [100, '+'];
    const displayValue = '20';
    const result = handlePercentage(expression, displayValue);
    expect(result).toBe('20');
  });

  it('calculates percentage for addition', () => {
    const expression = [200, '+'];
    const displayValue = '20';
    const result = handlePercentage(expression, displayValue);
    expect(result).toBe('40');
  });

  it('calculates percentage for subtraction', () => {
    const expression = [200, '-'];
    const displayValue = '15';
    const result = handlePercentage(expression, displayValue);
    expect(result).toBe('30');
  });

  it('calculates percentage for multiplication', () => {
    const expression = [50, '*'];
    const displayValue = '20';
    const result = handlePercentage(expression, displayValue);
    expect(result).toBe('0.2');
  });

  it('calculates percentage for division', () => {
    const expression = [100, '/'];
    const displayValue = '50';
    const result = handlePercentage(expression, displayValue);
    expect(result).toBe('0.5');
  });

  it('calculates percentage when there is no operator', () => {
    const expression: Array<string | number> = [];
    const displayValue = '25';
    const result = handlePercentage(expression, displayValue);
    expect(result).toBe('0.25');
  });

  it('returns "0" when display value is "0"', () => {
    const expression = [100, '+'];
    const displayValue = '0';
    const result = handlePercentage(expression, displayValue);
    expect(result).toBe('0');
  });
});
