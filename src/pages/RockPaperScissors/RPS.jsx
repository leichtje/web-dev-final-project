import React, { useState } from "react";
import GameView from "../RockPaperScissors/components/GameView";

export default function RPSMain() {
  const [inGame, setInGame] = useState(false);

  return (
    <div className="container">
      <h1 className="mainHeader">Rock Paper Scissors</h1>
      {!inGame ? (
        <button className="rps-button" onClick={() => setInGame(true)}>Start Game</button>
      ) : (
        <GameView onBack={() => setInGame(false)} />
      )}
    </div>
  );
}
