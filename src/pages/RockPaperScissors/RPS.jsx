import './RPS.css';
import GameView from './components/GameView';
import React from 'react'
import { useState } from 'react';
import RoomPage from './RoomPage';

function RpsApp() {
  const [roomId, setRoomId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleRoomJoin = (roomId, initialGameState) => {
    setRoomId(roomId);
    setGameState(initialGameState);
    setGameStarted(true);
  }

  return (
    <div className="container">
      <h1 className="mainHeader">Rock Paper Scissors</h1>
        {gameStarted ? (<GameView roomId = {roomId} gameState = {gameState} gameStarted = {gameStarted} setGameState={setGameState}/>
        ) : (
      <RoomPage onRoomJoin={handleRoomJoin}/>)}
    </div>
  );
}

export default RpsApp;