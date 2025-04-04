import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {  RouterProvider,  createBrowserRouter} from 'react-router'
import TicTacToeComponent from './pages/components/tic-tac-toe/TicTacToeComponent.jsx'
import Home from './pages/components/Home/Home.jsx'
import  RpsApp  from './pages/components/rps/RpsApp.jsx'
import LoginPage from './pages/components/Login/LoginPage.jsx'


const router = createBrowserRouter([
  {
    path:"/", 
    element: <App/>,
    children: [
      {
        path:"login",
        element: <LoginPage/>
      },
      {
        path:"/", 
        element: <Home/>
      },
      {
        path:"rps", 
        element: <RpsApp/>
      },
      {
        path:"tictactoe", element:<TicTacToeComponent />
      }
    ]
}
] 
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
