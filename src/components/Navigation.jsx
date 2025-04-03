import React from "react";
import { Link } from "react-router-dom";



const Navigation = () => {
  return (
    <nav>
      <ul className="navigation-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Rock-Paper-Scissors">Rock Paper Scissors</Link></li>
        <li><Link to="/tic-tac-toe">Tic Tac Toe</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
