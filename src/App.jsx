import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RPS from "./pages/RockPaperScissors/RPS";
import TicTacToe from "./pages/TicTacToe/TicTacToe";
import HomePage from "./HomePage";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login/LoginPage";
import Snake from "./pages/Snake/Snake";
import WordleGame from "./pages/Wordle/Wordle";



const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route index element={<HomePage />} />
          <Route path="/Rock-Paper-Scissors" element={<RPS/>} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/wordle" element={<WordleGame />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;