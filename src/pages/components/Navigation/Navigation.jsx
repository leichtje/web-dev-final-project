import React from 'react'
import { NavLink, useNavigate } from "react-router";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";

function Navigation() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUsername(storedUserName);
    }else {
      setUsername("");
    }
  }, [username]);
  console.log("username", username);

  // useEffect(() => {
    
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };

  return (
    <Nav 
      variant="underline" 
      className="justify-content-center border-bottom" 
      defaultActiveKey="/">
      {!username ? (
        <Nav.Item>
          <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
        </Nav.Item>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/rps">Rock Paper Scissors</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/tictactoe">Tic Tac Toe</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default Navigation;