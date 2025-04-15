import React, { useState } from 'react';
import './Piece.css';

const Piece = ({ color, player, currentPlayer }) => {
  const [position, setPosition] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className={`piece piece-${color} ${isActive ? 'active' : ''}`}
      onClick={() => currentPlayer === player && setIsActive(!isActive)}
    >
      {player + 1}
    </div>
  );
};

export default Piece;