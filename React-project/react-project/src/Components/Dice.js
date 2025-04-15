import React from 'react';
import './Dice.css';

const Dice = ({ currentPlayer, diceValue, onRoll, rolled, color }) => {
  return (
    <div className="dice-container">
      <div 
        className={`dice dice-${color}`} 
        onClick={onRoll}
        style={{ backgroundColor: rolled ? '#ccc' : 'white' }}
      >
        {diceValue > 0 ? diceValue : 'Roll'}
      </div>
      <p className="turn-indicator" style={{ color }}>
        Player {currentPlayer + 1}'s turn
      </p>
    </div>
  );
};

export default Dice;