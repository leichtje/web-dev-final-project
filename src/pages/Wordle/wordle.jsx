import React, { useState, useEffect, useCallback } from "react";
import "./style.css";

const gameConfig = {
  attempts: 6,
  wordLength: 5,
};

const WordleGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: gameConfig.attempts }, () =>
      Array(gameConfig.wordLength).fill("")
    )
  );
  const [targetWord, setTargetWord] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    async function fetchRandomWord() {
      const response = await fetch(
        `https://random-word-api.herokuapp.com/word?length=${gameConfig.wordLength}`
      );
      const data = await response.json();
      setTargetWord(data[0].toUpperCase());
    }
    fetchRandomWord();
  }, []);

  // https://it3049c-hangman.fly.dev/

  const updateGrid = useCallback(
    (row, col, letter) => {
      const newGrid = [...grid];
      newGrid[row][col] = letter;
      setGrid(newGrid);
    },
    [grid]
  );

  const handleKeyDown = useCallback(
    async (event) => {
      if (gameOver) return;

      const userInput = event.key.toUpperCase();
      if (/^[A-Z]$/.test(userInput) && currentPosition < gameConfig.wordLength) {
        updateGrid(currentAttempt, currentPosition, userInput);
        setCurrentPosition((pos) => pos + 1);
      } else if (userInput === "BACKSPACE" && currentPosition > 0) {
        setCurrentPosition((pos) => pos - 1);
        updateGrid(currentAttempt, currentPosition - 1, "");
      } else if (userInput === "ENTER" && currentPosition === gameConfig.wordLength) {
        const currentWord = grid[currentAttempt].join("");
        const isValid = await isWordValid(currentWord);
        if (!isValid) {
          alert("Invalid word!");
          return;
        }

        revealAttemptResult(currentWord);

        if (currentWord === targetWord) {
          setGameWon(true);
          setGameOver(true);
        } else if (currentAttempt + 1 < gameConfig.attempts) {
          setCurrentAttempt((attempt) => attempt + 1);
          setCurrentPosition(0);
        } else {
          setGameOver(true);
        }
      }
    },
    [grid, currentPosition, currentAttempt, targetWord, gameOver, updateGrid]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  async function isWordValid(word) {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking word validity:", error);
      return false;
    }
  }

  function checkWordLetters(word) {
    return word.split("").map((letter, index) => {
      if (letter === targetWord[index]) return "correct";
      if (targetWord.includes(letter)) return "misplaced";
      return "incorrect";
    });
  }

  function revealAttemptResult(word) {
    const results = checkWordLetters(word);
    const newGrid = [...grid];
    results.forEach((result, index) => {
      newGrid[currentAttempt][index] = { letter: word[index], result };
    });
    setGrid(newGrid);
  }

  return (
    <div className="wordle-container">
      <h1>Wordle</h1>
      <div id="wordle-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`letter ${
                  typeof cell === "object" ? cell.result : ""
                }`}
              >
                {typeof cell === "object" ? cell.letter : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-message">
          {gameWon ? "Congratulations! You won!" : `Game Over! The word was ${targetWord}.`}
        </div>
      )}
    </div>
  );
};

export default WordleGame;
