import React from 'react'
import { Outlet } from 'react-router';
import './App.css'
import Navigation from './pages/components/Navigation/Navigation'
import Footer from './pages/components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className='app-container'>
      <Navigation />
      <div className='content-container container'>
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App;