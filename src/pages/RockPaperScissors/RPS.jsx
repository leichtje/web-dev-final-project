import './RPS.css';
import GameView from './components/GameView';
import React from 'react'
import { useState } from 'react';

function RpsApp() {
  return (
    <div className="container">
      <h1 className="mainHeader">Rock Paper Scissors</h1>
      <GameView />
    </div>
  );
}

export default RpsApp;