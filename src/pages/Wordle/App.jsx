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
      const currentRow = Math.floor(currentPosition / gameConfig.wordLength);
      const currentCol = currentPosition % gameConfig.wordLength;
  
      if (/^[A-Z]$/.test(userInput) && currentPosition < grid.length) {
        if (currentCol < gameConfig.wordLength) {
          const newGrid = [...grid];
          newGrid[currentPosition] = userInput;
          updateGrid(newGrid);
          setCurrentPosition((pos) => pos + 1);
        }
      } else if (userInput === "BACKSPACE" && currentPosition > 0) {
        const deletionRow = Math.floor((currentPosition - 1) / gameConfig.wordLength);
        if (deletionRow === currentRow) {
          const newGrid = [...grid];
          newGrid[currentPosition - 1] = "";
          updateGrid(newGrid);
          setCurrentPosition((pos) => pos - 1);
        }
      } else if (
        userInput === "ENTER" &&
        currentCol === 0 && 
        currentPosition > 0 
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
          setCurrentPosition(currentPosition);
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
        {Array.from({ length: gameConfig.attempts }).map((_, rowIndex) => {
          const rowStart = rowIndex * gameConfig.wordLength;
          const rowEnd = rowStart + gameConfig.wordLength;
          const rowLetters = grid.slice(rowStart, rowEnd);
          const isSubmitted = currentPosition > rowEnd; // Row is submitted if current position is beyond it
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
