import { useState, useEffect } from "react";
import { Square } from "./Square";
import { checkWinningLines } from "./tictactoe";

export function Board({ gridSize }) {
    const [history, setHistory] = useState([Array(gridSize ** 2).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [isTie, setIsTie] = useState(false); 

    useEffect(() => {
        setHistory([Array(gridSize ** 2).fill(null)]);
        setCurrentMove(0);
        setCurrentPlayer("X");
        setGameOver(false);
        setWinner(null);
        setIsTie(false);
    }, [gridSize]);

    const squares = history[currentMove];

    function onSquareClick(index) {
        if (squares[index] || gameOver) return;

        const newSquares = squares.slice();
        newSquares[index] = currentPlayer;
        const newHistory = history.slice(0, currentMove + 1).concat([newSquares]);

        setHistory(newHistory);
        setCurrentMove(newHistory.length - 1);

        const gameWinner = checkWinningLines(gridSize, newSquares);
        if (gameWinner) {
            setWinner(gameWinner);
            setGameOver(true);
        } else if (newSquares.every(square => square !== null)) {  // Check for tie
            setIsTie(true);
            setGameOver(true);
        } else {
            setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
        }
    }

    function jumpTo(move) {
        setCurrentMove(move);
        setGameOver(false);
        setWinner(null);
        setIsTie(false);
        setCurrentPlayer(move % 2 === 0 ? "X" : "O");
    }

    function handleGameRestart() {
        setHistory([Array(gridSize ** 2).fill(null)]);
        setCurrentMove(0);
        setCurrentPlayer("X");
        setGameOver(false);
        setWinner(null);
        setIsTie(false);
    }

    return (
        <>
            {winner && <h2>🎉 Winner: {winner} 🎉</h2>}
            {isTie && !winner && <h2>🤝 It's a tie! 🤝</h2>}
            {!winner && !isTie && <h2>Current Player: {currentPlayer}</h2>}

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, 34px)`, gap: "4px" }}>
                {squares.map((square, index) => (
                    <Square key={index} value={square} onSquareClick={() => onSquareClick(index)} />
                ))}
            </div>

            <button onClick={handleGameRestart}>Reset</button>

            <h3>Game History</h3>
            <ol>
                {history.map((_, move) => (
                    <li key={move}>
                        <button onClick={() => jumpTo(move)}>
                            {move === 0 ? "Go to start" : `Go to move #${move}`}
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
}
