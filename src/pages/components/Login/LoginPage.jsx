import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
        if (username.trim().length > 0) {
            localStorage.setItem('username', username);
            navigate('/');
        }else {
            alert("Please enter a username");
        }
    }

    return (
        <>
        <h1>Login</h1>
        <Form style={{paddingBottom: "10px"}}>
        <Form.Group>
            <Form.Label htmlFor="username">
                    Username
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter Username"
                onChange={(e) => {setUsername(e.target.value)}}
            />
        </Form.Group>
        </Form>
        <Button 
            type='primary' 
            onClick={handleLogin}>
            Start the Game!
        </Button>
        </>
    )
}