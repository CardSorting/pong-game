import React from 'react';
import './GameOver.css';

const GameOver = ({ onRestart, onMenu, onNextLevel, result, score, level }) => {
  const title = result === 'victory' ? 'Victory!' : 'Defeat';

  return (
    <div className="game-over-screen">
      <h1 className={`game-over-title ${result}`}>{title}</h1>

      <div className="stats-container">
        <h2>Level {level} Complete</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Final Score</span>
            <span className="stat-value">{score.player} - {score.opponent}</span>
          </div>
          {/* Add more stats here as they become available */}
        </div>
      </div>

      <div className="game-over-buttons">
        {result === 'victory' ? (
          <button onClick={onNextLevel}>Next Level</button>
        ) : (
          <button onClick={onRestart}>Retry Level</button>
        )}
        <button onClick={onMenu}>Main Menu</button>
      </div>
    </div>
  );
};

export default GameOver;
