import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
    if (username.trim().length > 0) {
        localStorage.setItem('username', username);
        navigate('/');
    } else {
        alert("Please enter a username");
    }
    };

    return (
    <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label htmlFor="username" className="login-label">Username</label>
        <input
            id="username"
            type="text"
            placeholder="Enter Username"
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <button type="submit" className="login-button">
            Start the Game!
        </button>
        </form>
    </div>
    );
}
