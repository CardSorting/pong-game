import React from 'react';
import './Progression.css';

const Progression = ({ onBack, onSelectLevel, highestLevelUnlocked }) => {
  const totalLevels = 15; // Example total levels
  const levels = Array.from({ length: totalLevels }, (_, i) => {
    const levelNum = i + 1;
    return {
      id: levelNum,
      name: `Level ${levelNum}`,
      unlocked: levelNum <= highestLevelUnlocked,
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
          >
            <div className="level-number">{level.id}</div>
          </div>
        ))}
      </div>
      <button onClick={onBack}>Back to Menu</button>
    </div>
  );
};

export default Progression;
