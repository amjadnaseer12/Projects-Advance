import React from 'react';
import './Dice.css';

const Dice = ({ currentPlayer, setCurrentPlayer, diceValue, setDiceValue }) => {
  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    
    // Switch to next player (simple rotation for now)
    setCurrentPlayer((currentPlayer + 1) % 4);
  };

  return (
    <div className="dice-container">
      <div className="dice" onClick={rollDice}>
        {diceValue > 0 ? diceValue : 'Roll'}
      </div>
      <p>Player {currentPlayer + 1}'s turn</p>
    </div>
  );
};

export default Dice;