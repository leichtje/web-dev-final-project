import React, { useEffect, useState } from "react";
import "../RPS.css";

const API_BASE_URL = "https://game-room-api.fly.dev/api/rooms";

const GameView = ({ roomId, gameState, setGameState }) => {
  const userName = localStorage.getItem("username");
  const [userChoice, setUserChoice] = useState("rock");

  // Set yourself as player1 or player2 if not already assigned
  useEffect(() => {
    if (!gameState) return;
  
    const players = gameState.players || {};
    let updated = false;
  
    if (!players.player1) {
      players.player1 = userName;
      updated = true;
    } else if (!players.player2 && players.player1 !== userName) {
      players.player2 = userName;
      updated = true;
    }
  
    if (updated) {
      const updatedState = {
        ...gameState,
        players,
        currentTurn: players.player1, // start from player1
      };
      updateGameState(updatedState);
    }
  }, [gameState, userName]);
  

  // Poll for latest game state
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${API_BASE_URL}/${roomId}`);
      const data = await res.json();
      setGameState(data.gameState);
    }, 1500);

    return () => clearInterval(interval);
  }, [roomId]);

  const updateGameState = async (updatedState) => {
    await fetch(`${API_BASE_URL}/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameState: updatedState }),
    });
    setGameState(updatedState);
  };

  const handlePlay = async () => {
    if (!gameState.currentTurn || gameState.currentTurn !== userName) {
      alert("It's not your turn!");
      return;
    }

    const nextPlayer =
      gameState.players.player1 === userName
        ? gameState.players.player2
        : gameState.players.player1;

    const newHistory = [
      ...(gameState.history || []),
      `${userName} chose ${userChoice}`,
    ];

    const updatedState = {
      ...gameState,
      currentTurn: nextPlayer,
      history: newHistory,
    };

    await updateGameState(updatedState);
  };

  return (
    <div id="game-screen" style={{ border: `1px solid black`, padding: "1rem" }}>
      <h2>Room ID: {roomId}</h2>
      <p>Player 1: {gameState.players?.player1 || "Waiting..."}</p>
      <p>Player 2: {gameState.players?.player2 || "Waiting..."}</p>
      <p>Current Turn: {gameState.currentTurn || "Waiting..."}</p>

      <form id="game-form">
        <div className="form-group">
          <label htmlFor="user-selection">Select your choice: </label>
          <select
            className="custom-select"
            id="user-selection"
            name="user-selection"
            onChange={(e) => setUserChoice(e.target.value)}
          >
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select>
        </div>
        <button
          className="btn btn-success"
          type="button"
          id="go-button"
          onClick={handlePlay}
        >
          Play
        </button>
      </form>

      <h4>Game Log:</h4>
      <ul>
        {(gameState.history || []).map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>

      <button
        id="reset-game-button"
        className="btn btn-secondary"
        onClick={() => {
          const resetState = {
            ...gameState,
            currentTurn: gameState.players?.player1,
            history: [],
          };
          updateGameState(resetState);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default GameView;
