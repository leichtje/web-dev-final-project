import React, { useState, useEffect } from 'react';
import './Snake.css';

const ROWS = 14;
const COLS = 25;
const INITIAL_SNAKE = [{ row: 12, col: 12 }];
const INITIAL_DIRECTION = 'RIGHT';

const generateFood = () => {
  return {
    row: Math.floor(Math.random() * ROWS),
    col: Math.floor(Math.random() * COLS),
  };
};

const App = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateFood());
  const [gameOver, setGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [score, setScore] = useState(0);

  const checkCollision = (snake) => {
    const head = snake[0];
    return (
      snake.slice(1).some((segment) => segment.row === head.row && segment.col === head.col) ||
      head.row < 0 ||
      head.row >= ROWS ||
      head.col < 0 ||
      head.col >= COLS
    );
  };


  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0)
  };

  useEffect(() => {
    if (!gameOver && !isPause) {
      const moveSnake = () => {
        const newSnake = snake.map((segment) => ({ ...segment }));

        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.row = (head.row - 1 + ROWS) % ROWS;
            break;
          case 'DOWN':
            head.row = (head.row + 1) % ROWS;
            break;
          case 'LEFT':
            head.col = (head.col - 1 + COLS) % COLS;
            break;
          case 'RIGHT':
            head.col = (head.col + 1) % COLS;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
          setFood(generateFood());
          setScore(score + 10);
        } else {
          newSnake.pop();
        }

        if (checkCollision(newSnake)) {
          setGameOver(true);
        } else {
          setSnake(newSnake);
        }
      };

      const gameInterval = setInterval(moveSnake, 100);

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [snake, direction, food, gameOver, isPause, score]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
  
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);
  



  return (
    <div className="snake-game">
      <h1>React Snake Game</h1>
      <div className="game-board">
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  snake.some((segment) => segment.row === rowIndex && segment.col === colIndex)
                    ? 'snake'
                    : ''
                } ${food.row === rowIndex && food.col === colIndex ? 'food' : ''}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="dialog">
          <div className="reset">
            <p>Game Over! <b>Your Score 🐍 {score}</b></p>
            <button onClick={resetGame}>Restart</button>
          </div>
        </div>
      )}
      <div className="control">
        <button onClick={() => setIsPause(!isPause)}>
          {isPause ? 'Resume' : 'Pause'}
        </button>
        <p> Score : 🚀 {score}</p>
        <div className="button">
          <button className="up" onClick={() => setDirection('UP')}>↑</button><br />
          <button className="left" onClick={() => setDirection('LEFT')}>←</button>
          <button className="right" onClick={() => setDirection('RIGHT')}>→</button><br />
          <button className="down" onClick={() => setDirection('DOWN')}>↓</button>
        </div>
      </div>
    </div>
  );
}

export default App;