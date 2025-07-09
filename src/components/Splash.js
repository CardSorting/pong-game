import React, { useEffect, useState } from 'react';
import './Splash.css';

const Splash = ({ onComplete }) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleKeyPress = () => {
      onComplete();
    };
    window.addEventListener('keydown', handleKeyPress);

    const interval = setInterval(() => {
      setShowText(prev => !prev);
    }, 500); // Flashes every 500ms

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <h1>PONG</h1>
      {showText && <p className="flash-text">Press any key to start</p>}
    </div>
  );
};

export default Splash;
