export const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  hours = hours % 12 || 12;
  // const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes}`;
};

export const toggleSign = (currentValue: string): string => {
  if (currentValue.startsWith('-')) {
    return currentValue.slice(1);
  } else {
    return `-${currentValue}`;
  }
};

export const evaluateExpression = (expressionArray: Array<string | number>): number | string => {
  try {
    const joinedExpression = expressionArray.join('');
    return eval(joinedExpression);
  } catch {
    return 'Error';
  }
};

export const handlePercentage = (expression: Array<string | number>, displayValue: string) => {
  let value;
  if (expression.length > 0) {
    const lastOperator = expression[expression.length - 1];
    const previousValue = expression[expression.length - 2];

    if (lastOperator === '+' || lastOperator === '-') {
      value = (previousValue * parseFloat(displayValue)) / 100;
    }
    if (lastOperator === '*' || lastOperator === '/') {
      value = parseFloat(displayValue) / 100;
    }
  } else {
    value = parseFloat(displayValue) / 100;
  }

  return String(value);
};
