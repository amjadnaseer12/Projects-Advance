import React from 'react';
import Dice from './Dice';
import PlayerArea from './PlayerArea';
import Piece from './Piece';
import './Board.css';

const Board = ({ currentPlayer, setCurrentPlayer, diceValue, setDiceValue }) => {
  const colors = ['red', 'blue', 'green', 'yellow'];
  
  return (
    <div className="board-container">
      <div className="board">
        {/* Center area */}
        <div className="center"></div>
        
        {/* Paths */}
        {colors.map((color) => (
          <div key={color} className={`path path-${color}`}></div>
        ))}
        
        {/* Home areas */}
        {colors.map((color) => (
          <div key={`home-${color}`} className={`home home-${color}`}>
            {[1, 2, 3, 4].map((num) => (
              <Piece 
                key={`${color}-${num}`} 
                color={color} 
                player={colors.indexOf(color)}
                currentPlayer={currentPlayer}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="player-areas">
        {colors.map((color, index) => (
          <PlayerArea 
            key={color}
            color={color}
            player={index}
            isActive={currentPlayer === index}
          />
        ))}
      </div>
      
      <Dice 
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        diceValue={diceValue}
        setDiceValue={setDiceValue}
      />
    </div>
  );
};

export default Board;