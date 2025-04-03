import { useState } from 'react';
import './style.css';
import React from 'react';

const gameConfig = {
  attempts: 6,
  wordLength: 5,
};

const WordleGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: gameConfig.attempts }, () => Array(gameConfig.wordLength).fill(""))
  );
  const [targetWord, setTargetWord] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState(0);
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

      if (/^[A-Z]$/.test(userInput) && currentPosition < gameConfig.wordLength) {
        const newGrid = [...grid];
        newGrid[currentAttempt][currentPosition] = userInput;
        updateGrid(newGrid);
        setCurrentPosition((pos) => pos + 1);
      } else if (userInput === "BACKSPACE" && currentPosition > 0) {
        const newGrid = [...grid];
        newGrid[currentAttempt][currentPosition - 1] = "";
        updateGrid(newGrid);
        setCurrentPosition((pos) => pos - 1);
      } else if (userInput === "ENTER" && currentPosition === gameConfig.wordLength) {
        const currentWord = grid[currentAttempt].join("");
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

        if (currentAttempt + 1 < gameConfig.attempts) {
          setCurrentAttempt((attempt) => attempt + 1);
          setCurrentPosition(0);
        } else {
          console.log("Game Over!");
        }
      }
    },
    [grid, currentAttempt, currentPosition, targetWord, updateGrid]
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
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="wordle-row">
          {row.map((letter, colIndex) => (
            <div key={colIndex} className={`letter-box`}>{letter}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordleGame;
