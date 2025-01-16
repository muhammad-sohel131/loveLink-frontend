import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { GiLovers } from "react-icons/gi";

export default function Nav() {
  return (
    <header className='border-b border-[#e57339]'>
        <div className="section-container flex justify-between py-5">
            <div className="logo">
                <h2 className='text-3xl font-extrabold flex gap-4 text-[#e57339]'> <GiLovers />Love Link</h2>
            </div>
            <ul className='menu flex gap-5 text-lg'>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/biodatas">Biodatas</NavLink></li>
                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/contact">Contact Us</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/dashboard/userHome">Dashboard</NavLink></li>
            </ul>
        </div>
    </header>
  )
}
