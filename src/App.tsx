import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState([]);
  const [clearText, setClearText] = useState('AC');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${hours}:${minutes}`;
  };

  const inputDigit = (digit: string) => {
    setDisplayValue(prevValue => (prevValue === '0' ? digit : prevValue + digit));
    setClearText('C');
  };

  const clearDisplay = () => {
    if (clearText === 'C') {
      setDisplayValue('0');
      setClearText('AC');
      setExpression([]);
    } else {
      setDisplayValue('0');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);
    const newExpression = [...expression, inputValue, nextOperator];
    // @ts-ignore
    setExpression(newExpression);
    setDisplayValue('0');
    setClearText('C');
  };

  const handleEqual = () => {
    console.log(displayValue);
    const inputValue = parseFloat(displayValue);
    const newExpression = [...expression, inputValue];
    const result = evaluateExpression(newExpression);
    setDisplayValue(String(result));
    setExpression([]);
  };

  const evaluateExpression = (expressionArray: Array) => {
    try {
      const joinedExpression = expressionArray.join('');
      return eval(joinedExpression); // Evaluate the joined expression
    } catch {
      return 'Error';
    }
  };

  const inputDecimal = () => {
    setDisplayValue(prevValue => (prevValue.includes('.') ? prevValue : prevValue + '.'));
    setClearText('C');
  };

  const toggleSign = () => {
    setDisplayValue(prevValue => {
      const newValue = prevValue.startsWith('-') ? prevValue.slice(1) : '-' + prevValue;

      // Only change to "C" if the new value is not "0" or "-0"
      if (newValue !== '0' && newValue !== '-0') {
        setClearText('C');
      }

      return newValue;
    });
  };

  const handlePercentage = () => {
    if (expression.length > 0) {
      if (expression[expression.length - 1] === '+' || expression[expression.length - 1] === '-') {
        const value = (expression[expression.length - 2] * parseFloat(displayValue)) / 100;
        setDisplayValue(value);
      }
      if (expression[expression.length - 1] === '*' || expression[expression.length - 1] === '/') {
        const value = parseFloat(displayValue) / 100;
        setDisplayValue(value);
      }
    } else {
      const value = parseFloat(displayValue) / 100;
      setDisplayValue(value);
    }
  };

  return (
    <div className="iphone-calculator">
      <div className="header">
        <div className="time">{formatTime(time)}</div>
        <div className="status-icons">
          <img src="/status.png" alt="Status Icons" className="status-image" />
        </div>
      </div>

      <div>
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <div className="row">
            <button className="button function" onClick={clearDisplay}>
              {clearText}
            </button>
            <button className="button function" onClick={toggleSign}>
              +/-
            </button>
            <button className="button function" onClick={handlePercentage}>
              %
            </button>
            <button className="button operator" onClick={() => handleOperator('/')}>
              ÷
            </button>
          </div>
          <div className="row">
            <button className="button number" onClick={() => inputDigit('7')}>
              7
            </button>
            <button className="button number" onClick={() => inputDigit('8')}>
              8
            </button>
            <button className="button number" onClick={() => inputDigit('9')}>
              9
            </button>
            <button className="button operator" onClick={() => handleOperator('*')}>
              ×
            </button>
          </div>
          <div className="row">
            <button className="button number" onClick={() => inputDigit('4')}>
              4
            </button>
            <button className="button number" onClick={() => inputDigit('5')}>
              5
            </button>
            <button className="button number" onClick={() => inputDigit('6')}>
              6
            </button>
            <button className="button operator" onClick={() => handleOperator('-')}>
              −
            </button>
          </div>
          <div className="row">
            <button className="button number" onClick={() => inputDigit('1')}>
              1
            </button>
            <button className="button number" onClick={() => inputDigit('2')}>
              2
            </button>
            <button className="button number" onClick={() => inputDigit('3')}>
              3
            </button>
            <button className="button operator" onClick={() => handleOperator('+')}>
              +
            </button>
          </div>
          <div className="row">
            <button className="button number zero" onClick={() => inputDigit('0')}>
              0
            </button>
            <button className="button number" onClick={inputDecimal}>
              .
            </button>
            <button className="button operator" onClick={handleEqual}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
