import React from 'react'
import { Outlet } from 'react-router-dom'
import RootNavbar from '../components/navbars/RootNavbar'

const RootLayout = () => {
  return (
    <div>
        <RootNavbar />
        <Outlet />
    </div>
  )
}

export default RootLayout