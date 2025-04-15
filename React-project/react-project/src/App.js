import React, { useState } from 'react';
import Board from './Components/Board';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState(4); // Default to 4 players

  const startGame = (numPlayers) => {
    setPlayers(numPlayers);
    setGameStarted(true);
  };

  return (
    <div className="app">
      <h1>Ludo Game</h1>
      {!gameStarted ? (
        <div className="start-menu">
          <h2>Select Number of Players</h2>
          <div className="player-options">
            {[2, 3, 4].map(num => (
              <button key={num} onClick={() => startGame(num)}>
                {num} Players
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Board players={players} />
      )}
    </div>
  );
}

export default App;