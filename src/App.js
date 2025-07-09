import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import menuMusic from './Untitled.wav';
import Splash from './components/Splash';
import Menu from './components/Menu';
import Game from './components/Game';
import Settings from './components/Settings';
import GameOver from './components/GameOver';
import Progression from './components/Progression';

function App() {
  const [gameState, setGameState] = useState('splash');
  const [level, setLevel] = useState(1);
  const [highestLevelUnlocked, setHighestLevelUnlocked] = useState(1); // Start with level 1 unlocked
  const [finalScore, setFinalScore] = useState({ player: 0, opponent: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(menuMusic);
    audioRef.current.loop = true;
  }, []);

  const playMenuMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }
  };

  const stopMenuMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleSplashComplete = () => {
    setHasInteracted(true);
    setGameState('menu');
  };

  useEffect(() => {
    if (gameState === 'menu' && hasInteracted) {
      playMenuMusic();
    }
  }, [gameState, hasInteracted]);

  const handleStartGame = () => {
    stopMenuMusic();
    setGameState('progression');
  };

  const handleOpenSettings = () => {
    setGameState('settings');
  };

  const handleSelectLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameState('game');
  };

  const handleBackToMenu = () => {
    playMenuMusic();
    setGameState('menu');
  };

  const handleGameOver = (success, score) => {
    setFinalScore(score);
    if (success && level === highestLevelUnlocked) {
      setHighestLevelUnlocked(level + 1);
    }
    setGameState('gameOver');
  };

  const handleRestart = () => {
    setGameState('game');
  };

  const handleNextLevel = () => {
    setLevel(level + 1);
    setGameState('game');
  };

  return (
    <div className="App">
      {gameState === 'splash' && <Splash onComplete={handleSplashComplete} />}
      {gameState === 'menu' && <Menu onStartGame={handleStartGame} onOpenSettings={handleOpenSettings} />}
      {gameState === 'settings' && <Settings onBack={handleBackToMenu} />}
      {gameState === 'progression' && <Progression onBack={handleBackToMenu} onSelectLevel={handleSelectLevel} highestLevelUnlocked={highestLevelUnlocked} />}
      {gameState === 'game' && <Game key={level} level={level} onGameOver={handleGameOver} />}
      {gameState === 'gameOver' && <GameOver onRestart={handleRestart} onMenu={handleBackToMenu} onNextLevel={handleNextLevel} result={finalScore.player > finalScore.opponent ? 'victory' : 'defeat'} score={finalScore} level={level} />}
    </div>
  );
}

export default App;
