import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Dashboard.css'
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/UseAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Nav from '../Component/Nav/Nav';

export default function Dashboard() {
  const [isAdmin, setAdmin] = useState(false)
  const { user , logOut } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleLogout = () => {
    logOut()
      .then(res => {
        console.log(res)
      })
  }
  const { data: bio, isError, isLoading, refetch } = useQuery({
    queryKey: ["bioNav"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/bios/${user.email}`);
      return result.data;
    },
  });

  useEffect(() => {
    setAdmin(bio?.isAdmin)
  }, [bio])

  if(isLoading) return <h2>Loading...</h2>
  let bgStyle;
  if(isAdmin){
    bgStyle = {
      borderColor : '#e57339',
      background: '#e57339'
    }
  }else{
    bgStyle = {
      borderColor : '#571C87',
      background: '#571C87'
    }
  }
  return (
    <div className={`lg:flex gap-5 border-t-8 `}>
      <div className={`lg:w-[200px] lg:h-screen` } style={bgStyle}>
        {isAdmin ?
          <ul>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="adminDashboard">Admin Dashboard</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="manage-users">Manage Users
            </NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="approved-premium">Approved Premium</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="approved-contact-requests">Approved Contact Request</NavLink></li>
            <li>
              <NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="success-stories">Success Stories</NavLink>
            </li>
            <li className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer'><button onClick={handleLogout}>Logout</button></li>
          </ul> : <ul>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="userHome">Overview</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="edit-bio">Edit Biodata</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="view-bio">View Biodata</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="my-contact-requests">My Contact Requests</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="favourites-bio">Favourites Biodata</NavLink></li>
            <li>
              <NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="got-married">Got Married</NavLink>
            </li>
            <li className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' onClick={handleLogout}>Logout</li>
          </ul>}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
