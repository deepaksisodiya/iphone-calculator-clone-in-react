import React from 'react';
import './button.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type }) => (
  <button className={`button ${type}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
