import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const Navigation = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const storedUserName = localStorage.getItem("username");
  useEffect(() => {
    if (storedUserName) {
      setUsername(storedUserName);
    }else {
      setUsername("");
    }
  }, [storedUserName]);
  console.log("username", username);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };
  return (
    <nav>
      <ul className="navigation-list">

        {!username ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Rock-Paper-Scissors">Rock Paper Scissors</Link></li>
            <li><Link to="/tic-tac-toe">Tic Tac Toe</Link></li>
            <li><Link to="/wordle">Wordle</Link></li>
            <li><Link to="/snake">Snake</Link></li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
