import React from 'react';
import './header.css';

interface HeaderProps {
  time: string;
}

const Header: React.FC<HeaderProps> = ({ time }) => (
  <div className="header">
    <div className="time">{time}</div>
    <div className="status-icons">
      <img src="/status.png" alt="Status Icons" className="status-image" />
    </div>
  </div>
);

export default Header;
