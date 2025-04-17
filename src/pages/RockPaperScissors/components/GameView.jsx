import React, { useState } from "react";
import { RockPaperScissors } from "./rps";
import "../RPS.css";

const GameView = ({ onBack }) => {
  const userName = localStorage.getItem("username") || "Player";
  const [userChoice, setUserChoice] = useState("rock");
  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [game] = useState(new RockPaperScissors(userName));

  const playGame = () => {
    if (!userChoice) return;

    const cpuSelection = game.generateCPUResponse();
    const result = game.determineWinner(userChoice, cpuSelection);

    if (result === "win") setUserScore(prev => prev + 1);
    if (result === "lose") setCpuScore(prev => prev + 1);

    setGameHistory(prev => [
      ...prev,
      `${userName} selected ${userChoice}. CPU selected ${cpuSelection}: ${userName} ${result}s.`
    ]);
  };

  const resetGame = () => {
    setUserScore(0);
    setCpuScore(0);
    setGameHistory([]);
  };

  return (
    <div className="rps-container">

      <div className="scoreboard">
        <p>{userName}: {userScore} vs CPU: {cpuScore}</p>
      </div>

      <div className="form-section">
        <label htmlFor="user-selection">Select your choice:</label>
        <select
          id="user-selection"
          value={userChoice}
          onChange={(e) => setUserChoice(e.target.value)}
        >
          <option value="rock">Rock</option>
          <option value="paper">Paper</option>
          <option value="scissors">Scissors</option>
        </select>

        <button className="rps-button" onClick={playGame}>Go!</button>
      </div>

      <ul className="history-list">
        {gameHistory.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>

      <div className="button-row">
        <button className="rps-button secondary" onClick={resetGame}>Reset</button>
        <button className="rps-button secondary" onClick={onBack}>Back to Main Menu</button>
      </div>
    </div>
  );
};

export default GameView;
