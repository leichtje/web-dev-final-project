import React from "react";
import './pages/TicTacToe/TicTacToe.css';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RockPaperScissors from "./pages/rps/rps/App";
import TicTacToe from "./pages/TicTacToe/TicTacToe";

import HomePage from "./HomePage";
import Navigation from "./components/Navigation";


const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/rps" element={<RockPaperScissors />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;