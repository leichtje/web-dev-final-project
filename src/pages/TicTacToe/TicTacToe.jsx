import { useState, useEffect } from 'react';
import './TicTacToe.css';
import React from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://game-room-api.fly.dev/api/rooms';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ gameState, onPlay }) {
  const flatSquares = gameState.board.flat();

  function handleClick(i) {
    const row = Math.floor(i / 3);
    const col = i % 3;

    if (gameState.board[row][col] || calculateWinner(flatSquares)) return;

    const newBoard = gameState.board.map(row => [...row]);
    newBoard[row][col] = gameState.currentPlayer;

    const updatedState = {
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
    };

    onPlay(updatedState);
  }

  return (
    <>
      {[0, 1, 2].map(r => (
        <div key={r} className="board-row">
          {[0, 1, 2].map(c => {
            const i = r * 3 + c;
            return (
              <Square
                key={i}
                value={flatSquares[i]}
                onSquareClick={() => handleClick(i)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [roomID, setRoomID] = useState(null);
  const [gameState, setGameState] = useState({
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    currentPlayer: 'X',
  });

  async function createRoom() {
    const response = await axios.post(API_BASE_URL, {
      initialState: gameState,
    });
    setRoomID(response.data.roomId);
    setGameState(response.data.gameState);
    console.log('Room created with ID:', response.data.roomId);
  }

  async function fetchRoom() {
    if (!roomID) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/${roomID}`);
      const freshGameState = JSON.parse(JSON.stringify(response.data.gameState));
      setGameState(freshGameState);
      console.log("Game refreshed", freshGameState);
    } catch (error) {
      console.error("Failed to fetch room:", error);
    }
  }

  async function updateRoomState(updatedState) {
    if (!roomID) return;
    await axios.put(`${API_BASE_URL}/${roomID}`, {
      gameState: updatedState,
    });
  }

  function handlePlay(updatedState) {
    setGameState(updatedState);
    updateRoomState(updatedState);
  }

  async function resetGame() {
    const confirmReset = window.confirm("Are you sure you want to reset the game?");
    if (!confirmReset) return;

    const freshState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      currentPlayer: 'X',
    };
    setGameState(freshState);
    await updateRoomState(freshState);
  }

  const winner = calculateWinner(gameState.board.flat());
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${gameState.currentPlayer}`;

  useEffect(() => {
    createRoom();
  }, []);

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <Board gameState={gameState} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {roomID && <p>Room Code: <strong>{roomID}</strong></p>}
        <button onClick={fetchRoom}>Refresh Game</button>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
