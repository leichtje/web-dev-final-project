import GameView from './GameView';
import React from 'react'
import { useState } from 'react';

function RpsApp() {
  const [userName, setUserName] = useState("")
  //const [isGameStarted, setGameStarted] = useState(false);
  return (
    <div className="container">
      <h1 className="mainHeader">Rock Paper Scissors</h1>
      <GameView 
      userName = {userName} />
      {/* ) : (
      <WelcomeView 
      userName = {userName} 
      setUserName = {setUserName} 
      setGameStarted={setGameStarted}
      />
      )} */}
    </div>
  );
}

export default RpsApp;