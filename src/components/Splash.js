import React, { useEffect, useState } from 'react';
import './Splash.css';

const Splash = ({ onComplete }) => {
  const [showText, setShowText] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleKeyPress = () => {
      setFadeOut(true);
      // Wait for the fade-out animation to complete before calling onComplete
      setTimeout(() => {
        onComplete();
      }, 1000); // This duration should match the CSS animation duration
    };

    window.addEventListener('keydown', handleKeyPress);

    const interval = setInterval(() => {
      setShowText(prev => !prev);
    }, 700); // Slower, more subtle flashing

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="title-container">
        <h1 className="title-retro">PONG</h1>
      </div>
      {showText && <p className="flash-text">Press any key to start</p>}
    </div>
  );
};

export default Splash;
