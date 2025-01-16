import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Component/Nav/Nav'
import Footer from '../Component/Footer/Footer'

export default function Main() {
  return (
   <>
    <Nav />
    <Outlet />
    <Footer />
   </>
  )
}
