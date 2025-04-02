import './App.css';
import { useState } from 'react';
import GameView from './components/GameView';
import WelcomeView from './components/WelcomeView';
import RockPaperScissors from './rps';
import React from 'react';

function App() {
  const [userName, setUserName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [game, setGame] = useState(null);

  const handleStartGame = (userName) => {
    setUserName(userName);
    const gameInstance = new RockPaperScissors(userName);
    setGame(gameInstance);
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setUserName("");
    setGame(null);
    setGameStarted(false);
    setUserScore(0);
    setCpuScore(0);
  };

  return (
    <div className="container">
      <h1 className="mainHeader">Rock Paper Scissors</h1>

      {gameStarted ? (
        <GameView 
          userName={userName} 
          game={game} 
          handleResetGame={handleResetGame}
          userScore={userScore}
          setUserScore={setUserScore}
          cpuScore={cpuScore}
          setCpuScore={setCpuScore}
        />
      ) : (
        <WelcomeView 
          handleStartGame={handleStartGame} 
          userName={userName}
          userScore={userScore}
          cpuScore={cpuScore}
        />
      )}
    </div>
  );
}

export default App;




