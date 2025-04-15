import React from 'react';
import './Piece.css';

const Piece = ({ color, player, isActive, onClick, onMouseEnter, position }) => {
  return (
    <div 
      className={`piece piece-${color} ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {player + 1}
    </div>
  );
};

export default Piece;