import { useEffect, useState } from 'react';

import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import { formatTime, evaluateExpression, toggleSign, handlePercentage } from './../../utils/calculatorUtils';
import './calculator.css';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState([]);
  const [clearText, setClearText] = useState('AC');
  const [time, setTime] = useState(new Date());
  const [fontSize, setFontSize] = useState(80);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    adjustFontSize(displayValue);
  }, [displayValue]);

  const adjustFontSize = (value: string) => {
    const length = value.length;
    if (length > 7) {
      setFontSize(80 - (length - 7) * 10);
    } else {
      setFontSize(80);
    }
  };

  const inputDigit = (digit: string) => {
    if (displayValue.length < 10) {
      setDisplayValue(prevValue => (prevValue === '0' ? digit : prevValue + digit));
      setClearText('C');
    }
  };

  const clearDisplay = () => {
    if (clearText === 'C') {
      setDisplayValue('0');
      setClearText('AC');
      setExpression([]);
      setFontSize(80);
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
    setFontSize(80);
  };

  const handleEqual = () => {
    const inputValue = parseFloat(displayValue);
    const newExpression = [...expression, inputValue];
    const result = evaluateExpression(newExpression);
    setDisplayValue(String(result));
    setExpression([]);
  };

  const inputDecimal = () => {
    setDisplayValue(prevValue => (prevValue.includes('.') ? prevValue : prevValue + '.'));
    setClearText('C');
  };

  const handleToggleSign = () => {
    setDisplayValue(toggleSign(displayValue));
    if (displayValue !== '0' && displayValue !== '-0') {
      setClearText('C');
    }
  };

  const handlePercentageClick = () => {
    const value = handlePercentage(expression, displayValue);
    setDisplayValue(value);
  };

  return (
    <div className="iphone-calculator">
      <Header time={formatTime(time)} />
      <div>
        <div className="display" style={{ fontSize: `${fontSize}px` }}>
          {displayValue}
        </div>
        <div className="buttons">
          <div className="row">
            <Button label={clearText} onClick={clearDisplay} type="function" />
            <Button label="+/-" onClick={handleToggleSign} type="function" />
            <Button label="%" onClick={handlePercentageClick} type="function" />
            <Button label="÷" onClick={() => handleOperator('/')} type="operator" />
          </div>
          <div className="row">
            <Button label="7" onClick={() => inputDigit('7')} type="number" />
            <Button label="8" onClick={() => inputDigit('8')} type="number" />
            <Button label="9" onClick={() => inputDigit('9')} type="number" />
            <Button label="×" onClick={() => handleOperator('*')} type="operator" />
          </div>
          <div className="row">
            <Button label="4" onClick={() => inputDigit('4')} type="number" />
            <Button label="5" onClick={() => inputDigit('5')} type="number" />
            <Button label="6" onClick={() => inputDigit('6')} type="number" />
            <Button label="−" onClick={() => handleOperator('-')} type="operator" />
          </div>
          <div className="row">
            <Button label="1" onClick={() => inputDigit('1')} type="number" />
            <Button label="2" onClick={() => inputDigit('2')} type="number" />
            <Button label="3" onClick={() => inputDigit('3')} type="number" />
            <Button label="+" onClick={() => handleOperator('+')} type="operator" />
          </div>
          <div className="row">
            <Button label="0" onClick={() => inputDigit('0')} type="number zero" />
            <Button label="." onClick={inputDecimal} type="number" />
            <Button label="=" onClick={handleEqual} type="operator" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
