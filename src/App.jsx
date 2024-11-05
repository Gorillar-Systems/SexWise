import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <RootLayout />,
      children: [
        {index:true, element:<Home />},
        {path:"auth/login", element:<Login /> },
        {path:"auth/register", element:<Register />}
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
