import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RPS from "./pages/RockPaperScissors/RPS";
import TicTacToe from "./pages/TicTacToe/TicTacToe";
import HomePage from "./HomePage";
import Wordle from "./pages/Wordle/App";
import Navigation from "./components/Navigation";

<<<<<<< HEAD
=======



>>>>>>> origin/main
const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Rock-Paper-Scissors" element={<RPS/>} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/wordle" element={<Wordle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;