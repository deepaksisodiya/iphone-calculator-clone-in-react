import React from 'react';
import './button.css';

type ButtonType = 'function' | 'number' | 'operator' | 'number zero';
interface ButtonProps {
  label: string;
  onClick: () => void;
  type: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type }) => (
  <button className={`button ${type}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
