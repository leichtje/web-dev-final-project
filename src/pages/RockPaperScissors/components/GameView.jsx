import React, { useEffect, useState } from "react";
import "../RPS.css";

const API_BASE_URL = "https://game-room-api.fly.dev/api/rooms";

const GameView = ({ roomId, gameState, setGameState }) => {
  const userName = localStorage.getItem("username");
  const [userChoice, setUserChoice] = useState("rock");

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
        currentTurn: players.player1,
      };
      updateGameState(updatedState);
    }
  }, [gameState, userName]);
  


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

  const revealWinner = async (moves) => {
    const [p1, p2] = [gameState.players.player1, gameState.players.player2];
    const move1 = moves[p1];
    const move2 = moves[p2];
    let result = "";
  
    if (move1 === move2) {
      result = "It's a Tie!";
    } else if (
      (move1 === "rock" && move2 === "scissors") ||
      (move1 === "paper" && move2 === "rock") ||
      (move1 === "scissors" && move2 === "paper")
    ) {
      result = `${p1} wins!`;
    } else {
      result = `${p2} wins!`;
    }
  
    const newHistory = [
      ...(gameState.history || []),
      `${p1} chose ${move1}, ${p2} chose ${move2}. ${result}`
    ];
  
    const resetState = {
      ...gameState,
      moves: {},
      history: newHistory,
      currentTurn: gameState.currentTurn === p1 ? p2 : p1
    };
  
    await updateGameState(resetState);
  };
  

  const handlePlay = async () => {
    if (!gameState.players || !gameState.players.player1 || !gameState.players.player2) {
      alert("Waiting for another player...");
      return;
    }
  
    if (gameState.moves?.[userName]) {
      alert("You already made your move. Wait for the other player!");
      return;
    }
  
    const updatedMoves = {
      ...(gameState.moves || {}),
      [userName]: userChoice,
    };
  
    const nextPlayer = userName === gameState.players.player1
      ? gameState.players.player2
      : gameState.players.player1;
  
    const updatedState = {
      ...gameState,
      moves: updatedMoves,
      currentTurn: nextPlayer, 
    };
  
    await updateGameState(updatedState);
  
    if (updatedMoves[gameState.players.player1] && updatedMoves[gameState.players.player2]) {
      revealWinner(updatedMoves);
    }
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
