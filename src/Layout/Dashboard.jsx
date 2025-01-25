import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Dashboard.css'
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/UseAxiosPublic';

export default function Dashboard() {
  const [isAdmin, setAdmin] = useState(false)
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: bio, isError, isLoading, refetch } = useQuery({
    queryKey: ["bio"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bios/${user.email}`);
      return result.data;
    },
  });

  useEffect(() => {
    setAdmin(bio?.isAdmin)
  }, [bio])

  if(isLoading) return <h2>Loading...</h2>
  return (
    <div className='flex gap-5 border-t-8 border-[#e57339]'>
      <div className='w-[200px] bg-[#e57339] h-screen'>
        {isAdmin ?
          <ul>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="adminDashboard">Admin Dashboard</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="manage-users">Manage Users
            </NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="approved-premium">Approved Premium</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="approved-contact-requests">Approved Contact Request</NavLink></li>
            <li className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer'><button>Logout</button></li>
          </ul> : <ul>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="userHome">Overview</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="edit-bio">Edit Biodata</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="view-bio">View Biodata</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="my-contact-requests">My Contact Requests</NavLink></li>
            <li><NavLink className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer' to="favourites-bio">Favourites Biodata</NavLink></li>
            <li className='p-2 mb-2 text-white block text-lg border-b border-white cursor-pointer'>Logout</li>
          </ul>}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
