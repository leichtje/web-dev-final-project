import { useState } from "react";
import { RockPaperScissors } from "./rps";

const GameView = () => {
  const userName = localStorage.getItem("username");
  const [userChoice, setUserChoice] = useState("rock")
  const [userScore, setUserScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [game] = useState(new RockPaperScissors(userName));

  const playGame = () => {
    if (!userChoice) return;
    
    const cpuSelection = game.generateCPUResponse();
    const result = game.determineWinner(userChoice, cpuSelection)
    console.log(result)
    if (result === `win`) {
      setUserScore((prev) => prev + 1)
    }
    if (result === `lose`) {
      setCpuScore((prev) => prev + 1)
    }

    setGameHistory((prevHistory) => [
      ...prevHistory,
      ` ${userName} selected ${userChoice}. CPU selected ${cpuSelection}: ${userName} ${result}s`
    ]);
  }
  return (
    <div id="game-screen" style={{border: `1px solid black`}}>
      <div id="score-tally">
        <p id="score"> {userName}: {userScore} v CPU: {cpuScore}</p>
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
            <option id="rock" value="rock" >
              Rock
            </option>
            <option id="paper" value="paper">
              Paper
            </option>
            <option id="scissors" value="scissors">
              Scissors
            </option>
          </select>
        </div>
        <button 
        className="btn btn-success" 
        type="button" 
        id="go-button"
        onClick={playGame}>
          Go!
        </button>
      </form>

      <p id="game-history">
        {gameHistory.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </p>
      <button 
      id="reset-game-button" 
      className="btn btn-secondary"
      onClick={() => {
        setCpuScore(0);
        setUserScore(0);
        setGameHistory([]);
      }}
      >
        Reset
      </button>
    </div>
  );
  }
export default GameView;