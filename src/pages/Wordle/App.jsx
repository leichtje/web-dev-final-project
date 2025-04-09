import { useState, useEffect, useCallback } from 'react';
import './style.css';
import React from 'react';

const gameConfig = {
  attempts: 6,
  wordLength: 5,
};

const WordleGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: gameConfig.attempts * gameConfig.wordLength }, () => "")
  );
  const [targetWord, setTargetWord] = useState("");
  const [currentPosition, setCurrentPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    async function fetchWord() {
      try {
        const response = await fetch(
          `https://random-word-api.herokuapp.com/word?length=${gameConfig.wordLength}`
        );
        const data = await response.json();
        setTargetWord(data[0].toUpperCase());
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    }
    fetchWord();
  }, []);

  const updateGrid = useCallback((newGrid) => {
    setGrid([...newGrid]);
  }, []);

  const handleKeyDown = useCallback(
    async (event) => {
      if (gameOver) return; 

      const userInput = event.key.toUpperCase();
      const currentRow = Math.floor(currentPosition / gameConfig.wordLength);
      const currentCol = currentPosition % gameConfig.wordLength;

      if (/^[A-Z]$/.test(userInput) ) {
        if (currentCol < gameConfig.wordLength && currentPosition < grid.length) {
          const newGrid = [...grid];
          newGrid[currentPosition] = userInput;
          updateGrid(newGrid);
          setCurrentPosition((pos) => pos + 1);
        }
      } else if (userInput === "BACKSPACE") {
        if (currentPosition > 0) {
          const deletionRow = Math.floor((currentPosition - 1) / gameConfig.wordLength);
          if (deletionRow === currentRow) {
            const newGrid = [...grid];
            newGrid[currentPosition - 1] = "";
            updateGrid(newGrid);
            setCurrentPosition((pos) => pos - 1);
          }
        }
      } else if (userInput === "ENTER") {
        const currentCol = currentPosition % gameConfig.wordLength;
        if (currentCol === gameConfig.wordLength) { 
          const start = currentRow * gameConfig.wordLength;
          const currentWord = grid.slice(start, start + gameConfig.wordLength).join("");
          
          if (currentWord.length !== gameConfig.wordLength) return;
          
          if (!(await isWordValid(currentWord))) {
            alert("Not a valid word!");
            return;
          }
        
          if (currentWord === targetWord) {
            setGameWon(true);
            setGameOver(true);
            return;
          }
        

          const isLastAttempt = currentRow === gameConfig.attempts - 1;
          if (isLastAttempt) {
            setGameOver(true);
          } else {

            setCurrentPosition((currentRow + 1) * gameConfig.wordLength);
          }
        }
      }
    },
    [grid, currentPosition, targetWord, updateGrid, gameOver]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  async function isWordValid(word) {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      return response.ok;
    } catch (error) {
      console.error(`Error checking word validity:`, error);
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

  return (
    <div className="wordle-container">
      <h1>Wordle Game</h1>
      <div id="wordle-grid">
        {Array.from({ length: gameConfig.attempts }).map((_, rowIndex) => {
          const rowStart = rowIndex * gameConfig.wordLength;
          const rowEnd = rowStart + gameConfig.wordLength;
          const rowLetters = grid.slice(rowStart, rowEnd);
          const isSubmitted = currentPosition > rowEnd;
          const results = isSubmitted ? checkWordLetters(rowLetters.join("")) : [];
          
          return (
            <div key={rowIndex} className="wordle-row">
              {rowLetters.map((letter, colIndex) => (
                <div
                  key={colIndex}
                  className={`letter ${
                    isSubmitted ? results[colIndex] : ""
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      
      {gameOver && !gameWon && (
        <div className="game-over-message">
          Game Over! The word was: <strong>{targetWord}</strong>
        </div>
      )}
      
      {gameWon && (
        <div className="game-won-message">
          Congratulations! You guessed the word correctly!
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <WordleGame />
    </div>
  );
}