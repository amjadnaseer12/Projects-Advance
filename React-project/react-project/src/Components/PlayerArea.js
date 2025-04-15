import React from 'react';
import './PlayerArea.css';

const PlayerArea = ({ color, player, isActive, pieces }) => {
  const piecesInHome = pieces?.filter(p => p.position === -1).length || 0;
  const piecesFinished = pieces?.filter(p => p.reachedHome).length || 0;

  return (
    <div className={`player-area ${isActive ? 'active' : ''}`}>
      <h3 style={{ color }}>Player {player + 1}</h3>
      <div className="piece-count">
        <span>Home: {piecesInHome}</span>
        <span>Finished: {piecesFinished}/4</span>
      </div>
    </div>
  );
};

export default PlayerArea;