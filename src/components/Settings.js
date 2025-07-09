import React from 'react';
import './Settings.css';

const Settings = ({ onBack }) => {
  return (
    <div className="settings-screen">
      <h1>Settings</h1>
      <div className="settings-options">
        <p>Difficulty: Normal</p>
        <p>Sound: On</p>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default Settings;
