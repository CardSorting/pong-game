import React from 'react';
import './Progression.css';
import { getThemeForLevel } from '../themes';

const Progression = ({ onBack, onSelectLevel, highestLevelUnlocked }) => {
  const totalLevels = 15; // Example total levels
  const levels = Array.from({ length: totalLevels }, (_, i) => {
    const levelNum = i + 1;
    return {
      id: levelNum,
      name: `Level ${levelNum}`,
      unlocked: levelNum <= highestLevelUnlocked,
      theme: getThemeForLevel(levelNum),
    };
  });

  const handleLevelClick = (level) => {
    if (level.unlocked) {
      onSelectLevel(level.id);
    }
  };

  return (
    <div className="progression-screen">
      <h1>Select Level</h1>
      <div className="level-grid">
        {levels.map(level => (
          <div
            key={level.id}
            className={`level-item ${level.unlocked ? 'unlocked' : 'locked'}`}
            onClick={() => handleLevelClick(level)}
            style={{
              background: level.unlocked ? level.theme.background : '#333',
              borderColor: level.unlocked ? level.theme.paddleColor : '#555',
              boxShadow: level.unlocked ? `0 0 15px ${level.theme.paddleColor}` : 'none'
            }}
          >
            <div className="level-number">{level.id}</div>
            {level.unlocked && <div className="level-theme-name">{level.theme.name}</div>}
          </div>
        ))}
      </div>
      <button onClick={onBack}>Back to Menu</button>
    </div>
  );
};

export default Progression;
