import { useState } from 'react';

const WelcomeView = ({ handleStartGame, userName, userScore, cpuScore }) => {
  const [localUserName, setLocalUserName] = useState("");

  const handleStartButton = () => {
    handleStartGame(localUserName);
  };

  return (
    <div id="welcome-screen">
      <title>Rock Paper Scissors</title>
      <form id="name-form">
        <div className="form-group">
          <label htmlFor="username">Type your name: </label>
          <input
            value={localUserName}
            onChange={(e) => setLocalUserName(e.target.value)}
            className="form-control"
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter Name Here..."
            minLength="2"
            maxLength="15"
          />
        </div>
        {localUserName && (
          <button
            className="btn btn-primary"
            id="start-game-button"
            type="button"
            onClick={handleStartButton}
          >
            Start Game!
          </button>
        )}
      </form>
    </div>
  );
};

export default WelcomeView;


