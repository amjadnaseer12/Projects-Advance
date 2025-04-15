import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import PlayerArea from './PlayerArea';
import Piece from './Piece';
import './Board.css';

const Board = ({ players }) => {
  const colors = ['red', 'blue', 'green', 'yellow'].slice(0, players);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [rolled, setRolled] = useState(false);
  const [pieces, setPieces] = useState({});
  const [winner, setWinner] = useState(null);

  // Initialize pieces
  useEffect(() => {
    const initialPieces = {};
    colors.forEach((color, playerIndex) => {
      initialPieces[playerIndex] = Array(4).fill().map((_, i) => ({
        id: i,
        position: -1, // -1 means in home area
        pathIndex: -1,
        isActive: false,
        reachedHome: false
      }));
    });
    setPieces(initialPieces);
  }, [players]);

  const rollDice = () => {
    if (rolled) return;
    
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    setRolled(true);
    
    // If not 6, check if player has movable pieces
    if (value !== 6) {
      const movablePieces = pieces[currentPlayer].filter(p => 
        canPieceMove(currentPlayer, p, value)
      );
      if (movablePieces.length === 0) {
        setTimeout(() => nextTurn(), 1000);
      }
    }
  };

  const nextTurn = () => {
    setRolled(false);
    setCurrentPlayer((currentPlayer + 1) % players);
    setDiceValue(0);
    
    // Deactivate all pieces
    const updatedPieces = {...pieces};
    for (let player in updatedPieces) {
      updatedPieces[player] = updatedPieces[player].map(p => ({
        ...p,
        isActive: false
      }));
    }
    setPieces(updatedPieces);
  };

  const canPieceMove = (player, piece, diceRoll) => {
    if (piece.reachedHome) return false;
    
    if (piece.position === -1) {
      return diceRoll === 6;
    }
    
    const newPosition = piece.position + diceRoll;
    const maxPosition = 51; // Total cells in the path
    
    if (newPosition > maxPosition) return false;
    
    return true;
  };

  const movePiece = (player, pieceId) => {
    if (player !== currentPlayer || !rolled || winner) return;
    
    const piece = pieces[player][pieceId];
    
    if (!canPieceMove(player, piece, diceValue)) return;
    
    const updatedPieces = {...pieces};
    const pieceToMove = updatedPieces[player][pieceId];
    
    // If piece is in home and dice is 6, move to start
    if (pieceToMove.position === -1 && diceValue === 6) {
      pieceToMove.position = player * 13; // Starting position for each player
      pieceToMove.pathIndex = 0;
    } 
    // If piece is on the path
    else if (pieceToMove.position >= 0) {
      const newPosition = pieceToMove.position + diceValue;
      const maxPosition = 51;
      
      if (newPosition > maxPosition) {
        // Can't move beyond the path
        return;
      }
      
      pieceToMove.position = newPosition;
      pieceToMove.pathIndex = (pieceToMove.pathIndex + diceValue) % 52;
      
      // Check if piece reached home
      if (newPosition === maxPosition) {
        pieceToMove.reachedHome = true;
        
        // Check if player has won
        if (updatedPieces[player].every(p => p.reachedHome)) {
          setWinner(player);
        }
      }
    }
    
    // Check for captures
    colors.forEach((_, otherPlayer) => {
      if (otherPlayer === player) return;
      
      updatedPieces[otherPlayer] = updatedPieces[otherPlayer].map(p => {
        if (p.position === pieceToMove.position && p.position !== -1 && p.position !== 51) {
          // Capture this piece (send it back home)
          return {...p, position: -1, pathIndex: -1};
        }
        return p;
      });
    });
    
    setPieces(updatedPieces);
    
    // If dice wasn't 6, move to next player
    if (diceValue !== 6) {
      setTimeout(() => nextTurn(), 1000);
    } else {
      setRolled(false);
    }
  };

  const toggleActive = (player, pieceId) => {
    if (player !== currentPlayer || !rolled) return;
    
    const updatedPieces = {...pieces};
    updatedPieces[player] = updatedPieces[player].map((p, i) => ({
      ...p,
      isActive: i === pieceId && canPieceMove(player, p, diceValue)
    }));
    
    setPieces(updatedPieces);
  };

  return (
    <div className="board-container">
      {winner !== null && (
        <div className="winner-overlay">
          <div className="winner-message">
            Player {winner + 1} ({colors[winner]}) wins!
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        </div>
      )}
      
      <div className="board">
        {/* Center area */}
        <div className="center"></div>
        
        {/* Path cells */}
        {Array(52).fill().map((_, i) => (
          <div 
            key={`cell-${i}`} 
            className={`path-cell cell-${i}`}
            data-position={i}
          ></div>
        ))}
        
        {/* Home areas */}
        {colors.map((color, playerIndex) => (
          <div key={`home-${color}`} className={`home home-${color}`}>
            {pieces[playerIndex]?.map((piece, pieceId) => (
              piece.position === -1 && !piece.reachedHome && (
                <Piece 
                  key={`${color}-${pieceId}`}
                  color={color}
                  player={playerIndex}
                  isActive={piece.isActive}
                  onClick={() => movePiece(playerIndex, pieceId)}
                  onMouseEnter={() => toggleActive(playerIndex, pieceId)}
                  position={piece.position}
                />
              )
            ))}
          </div>
        ))}
        
        {/* Final home areas */}
        {colors.map((color, playerIndex) => (
          <div key={`final-home-${color}`} className={`final-home final-home-${color}`}>
            {pieces[playerIndex]?.map((piece, pieceId) => (
              piece.reachedHome && (
                <Piece 
                  key={`${color}-${pieceId}-home`}
                  color={color}
                  player={playerIndex}
                  position={piece.position}
                />
              )
            ))}
          </div>
        ))}
        
        {/* Pieces on the board */}
        {colors.map((color, playerIndex) => (
          pieces[playerIndex]?.map((piece, pieceId) => (
            piece.position >= 0 && !piece.reachedHome && (
              <Piece 
                key={`${color}-${pieceId}-board`}
                color={color}
                player={playerIndex}
                isActive={piece.isActive}
                onClick={() => movePiece(playerIndex, pieceId)}
                onMouseEnter={() => toggleActive(playerIndex, pieceId)}
                position={piece.position}
                style={{
                  left: getPiecePosition(piece.position, playerIndex).x,
                  top: getPiecePosition(piece.position, playerIndex).y,
                  position: 'absolute',
                }}
              />
            )
          ))
        ))}
      </div>
      
      <div className="player-areas">
        {colors.map((color, index) => (
          <PlayerArea 
            key={color}
            color={color}
            player={index}
            isActive={currentPlayer === index}
            pieces={pieces[index]}
          />
        ))}
      </div>
      
      <Dice 
        currentPlayer={currentPlayer}
        diceValue={diceValue}
        onRoll={rollDice}
        rolled={rolled}
        color={colors[currentPlayer]}
      />
    </div>
  );
};

// Helper function to calculate piece positions on the board
const getPiecePosition = (position, player) => {
  if (position < 0) return { x: 0, y: 0 };
  
  const pathPositions = [
    // Red path (player 0)
    { x: 85, y: 10 }, { x: 85, y: 60 }, { x: 85, y: 110 }, { x: 85, y: 160 }, 
    { x: 85, y: 210 }, { x: 85, y: 260 }, { x: 85, y: 310 }, { x: 85, y: 360 }, 
    { x: 85, y: 410 }, { x: 85, y: 460 }, { x: 135, y: 460 }, { x: 185, y: 460 },
    { x: 235, y: 460 }, { x: 285, y: 460 }, { x: 335, y: 460 }, { x: 385, y: 460 },
    { x: 435, y: 460 }, { x: 435, y: 410 }, { x: 435, y: 360 }, { x: 435, y: 310 },
    { x: 435, y: 260 }, { x: 435, y: 210 }, { x: 435, y: 160 }, { x: 435, y: 110 },
    { x: 435, y: 60 }, { x: 435, y: 10 }, { x: 385, y: 10 }, { x: 335, y: 10 },
    { x: 285, y: 10 }, { x: 235, y: 10 }, { x: 185, y: 10 }, { x: 135, y: 10 },
    { x: 85, y: 10 }, { x: 85, y: 60 }, { x: 85, y: 110 }, { x: 85, y: 160 },
    { x: 85, y: 210 }, { x: 85, y: 260 }, { x: 85, y: 310 }, { x: 85, y: 360 },
    { x: 85, y: 410 }, { x: 85, y: 460 }, { x: 135, y: 460 }, { x: 185, y: 460 },
    { x: 235, y: 460 }, { x: 285, y: 460 }, { x: 335, y: 460 }, { x: 385, y: 460 },
    { x: 435, y: 460 }, { x: 435, y: 410 }, { x: 435, y: 360 }, { x: 435, y: 310 },
    { x: 435, y: 260 }, { x: 435, y: 210 }
  ];
  
  // Adjust position based on player
  const adjustedPosition = (position + player * 13) % 52;
  return pathPositions[adjustedPosition] || { x: 0, y: 0 };
};

export default Board;