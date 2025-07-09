import React, { useEffect } from 'react';
import './Splash.css';

const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show splash for 3 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <h1>PONG</h1>
    </div>
  );
};

export default Splash;
