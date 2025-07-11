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
    window.addEventListener('touchstart', handleKeyPress);

    const interval = setInterval(() => {
      setShowText(prev => !prev);
    }, 700); // Slower, more subtle flashing

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleKeyPress);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="title-container">
        <h1 className="title-retro">PONG</h1>
      </div>
      {showText && <p className="flash-text">Press any key or tap to start</p>}
    </div>
  );
};

export default Splash;
