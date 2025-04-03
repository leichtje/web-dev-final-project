import { useState, useRef } from 'react';
import React from "react";

const GameView = ({ userName, game, handleResetGame }) => {
  const [userChoice, setUserChoice] = useState("rock");
  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  
  const scoreRef = useRef();

  const handlePlay = () => {
    const { result, score, logEntry } = game.play(userChoice);

    setUserScore(score.user);
    setCpuScore(score.cpu);
    setGameHistory([...gameHistory, logEntry]);
  };

  const handleResetButtonClick = () => {
    setUserChoice("");
    setUserScore(0);
    setCpuScore(0);
    setGameHistory([]);
    handleResetGame();
  };

  return (
    <div id="game-screen">
      <title>Rock Paper Scissors</title>
      <div id="score-tally">
        <p id="score" ref={scoreRef}>{userName}: {userScore} v CPU: {cpuScore}</p>
      </div>

      <form id="game-form">
        <div className="form-group">
          <label htmlFor="user-selection">Select your choice: </label>
          <select
            className="custom-select"
            id="user-selection"
            name="user-selection"
            onChange={(e) => setUserChoice(e.target.value)}
          >
            <option id="rock" value="rock">Rock</option>
            <option id="paper" value="paper">Paper</option>
            <option id="scissors" value="scissors">Scissors</option>
          </select>
        </div>
        <div className="btn-group">
          <button className="btn btn-success" id="go-button" type="button" onClick={handlePlay}>
            Play
          </button>
          <button className="btn btn-secondary" id="reset-game-button" type="button" onClick={handleResetButtonClick}>
            Reset
          </button>
        </div>
      </form>

      <div id="game-history">
        <h3>Game History</h3>
        <ul>
          {gameHistory.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameView;














