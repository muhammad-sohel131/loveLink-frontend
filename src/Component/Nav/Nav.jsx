import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { GiLovers } from "react-icons/gi";
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/UseAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function Nav() {
  const { user, logOut } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: biodata, error, isLoading } = useQuery({
    queryKey: ["bio"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/bios/${user.email}`);
      return result.data;
    }
  })
  if(isLoading){
    return <h2>Loading...</h2>
  }
  const isAdmin = biodata?.isAdmin ? true: false;
  
  const url = isAdmin ? '/dashboard/adminDashboard' : '/dashboard/userHome'
  const handleLogout = () => {
    logOut()
      .then(res => {
        console.log(res)
      })
  }
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
          {
            user ? <>
              <li><NavLink to={url}>Dashboard</NavLink></li> <li className='cursor-pointer' onClick={handleLogout}>Logout</li>
            </> : <li><NavLink to="/login">Login</NavLink></li>
          }

        </ul>
      </div>
    </header>
  )
}
