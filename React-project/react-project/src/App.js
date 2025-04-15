import React, { useState } from 'react';
import Board from './Components/Board';
import './App.css';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setCurrentPlayer(0);
  };

  return (
    <div className="app">
      <h1>Ludo Game</h1>
      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <Board 
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          diceValue={diceValue}
          setDiceValue={setDiceValue}
        />
      )}
    </div>
  );
}

export default App;