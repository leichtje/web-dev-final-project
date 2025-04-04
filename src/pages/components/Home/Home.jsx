import React from 'react'
import { Link } from "react-router"
import './Home.css'
export default function Home() {
    return (
        <div>
            <h1>GameHub</h1>
            <p>Welcome to GameHub</p>
            {/* <Button 
            variant="primary"
            >
                <img src="/assets/11151414.jpg" alt="" height={100}/>
                Tic Tac Toe
            </Button> */}
            <Link 
            to="/tictactoe" 
            className="btn btn d-flex align-items-center game-link">
                <img src="/assets/11151414.jpg" alt="" height={50} className="me-2"/>
                Tic Tac Toe
            </Link>
            <Link to="/rps" className="btn btn d-flex align-items-center game-link">
                <img style={{borderRadius: "20"}} src="/assets/rock-paper-scissors.png" alt="" height={50} className="me-2"/>
                Rock Paper Scissors
            </Link>
        </div>
    )
}