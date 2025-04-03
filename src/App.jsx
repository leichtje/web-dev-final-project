import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RockPaperScissors from "./pages/rps/rps/App";
import TicTacToe from "./pages/TicTacToe/App";
import HomePage from "./HomePage";
import Navigation from "./components/Navigation";
import Wordle from "./pages/wordle/App";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/rps" element={<RockPaperScissors />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/wordle" element={<Wordle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;