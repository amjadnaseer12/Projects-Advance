import React from 'react';
import './PlayerArea.css';

const PlayerArea = ({ color, player, isActive }) => {
  return (
    <div className={`player-area ${isActive ? 'active' : ''}`}>
      <h3 style={{ color }}>Player {player + 1}</h3>
      <div className="pieces">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className={`piece-marker piece-${color}`}>{num}</div>
        ))}
      </div>
    </div>
  );
};

export default PlayerArea;