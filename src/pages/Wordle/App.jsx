import { useState, useEffect, useCallback } from 'react';
import './style.css';
import React from 'react';

const gameConfig = {
  attempts: 5,
  wordLength: 5,
};

const WordleGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: gameConfig.attempts * gameConfig.wordLength }, () => "")
  );
  const [targetWord, setTargetWord] = useState("");
  const [currentPosition, setCurrentPosition] = useState(0);

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
      const userInput = event.key.toUpperCase();

      if (/^[A-Z]$/.test(userInput) && currentPosition < grid.length) {
        const newGrid = [...grid];
        newGrid[currentPosition] = userInput;
        updateGrid(newGrid);
        setCurrentPosition((pos) => pos + 1);
      } else if (userInput === "BACKSPACE" && currentPosition > 0) {
        const newGrid = [...grid];
        newGrid[currentPosition - 1] = "";
        updateGrid(newGrid);
        setCurrentPosition((pos) => pos - 1);
      } else if (
        userInput === "ENTER" &&
        (currentPosition % gameConfig.wordLength === 0 || currentPosition === grid.length)
      ) {
        const start = currentPosition - gameConfig.wordLength;
        const currentWord = grid.slice(start, currentPosition).join("");
        if (!(await isWordValid(currentWord))) {
          console.log("Invalid word");
          return;
        }

        const results = checkWordLetters(currentWord);
        console.log(results);

        if (currentWord === targetWord) {
          console.log("You won!");
          return;
        }

        if (currentPosition < grid.length) {
          setCurrentPosition((pos) => pos);
        } else {
          console.log("Game Over!");
        }
      }
    },
    [grid, currentPosition, targetWord, updateGrid]
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
      <div id="wordle-grid">
        {Array.from({ length: gameConfig.attempts }).map((_, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {grid
              .slice(rowIndex * gameConfig.wordLength, (rowIndex + 1) * gameConfig.wordLength)
              .map((letter, colIndex) => (
                <div
                  key={colIndex}
                  className={`letter ${
                    checkWordLetters(grid.slice(rowIndex * gameConfig.wordLength, (rowIndex + 1) * gameConfig.wordLength).join(""))[colIndex]
                  }`}
                >
                  {letter}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordleGame;
