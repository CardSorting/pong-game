import React from 'react';
import './Menu.css';

const Menu = ({ onStartGame, onOpenSettings }) => {
  return (
    <div className="menu-screen">
      <h1>PONG</h1>
      <div className="menu-buttons">
        <button onClick={onStartGame}>Start Game</button>
        <button onClick={onOpenSettings}>Settings</button>
      </div>
    </div>
  );
};

export default Menu;
