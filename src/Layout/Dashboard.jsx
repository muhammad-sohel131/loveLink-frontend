import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './Dashboard.css'
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/UseAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Nav from '../Component/Nav/Nav';
import HeaderLoading from '../Component/HeaderLoading/HeaderLoading';
import { IoHomeOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';

export default function Dashboard() {
  const [isAdmin, setAdmin] = useState(false)
  const { user, logOut } = useContext(AuthContext);
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

  if (isLoading) return <HeaderLoading />

  return (
    <div className={`lg:flex gap-5 border-t-8 border-[#e57339]`}>
      <div className={`lg:w-[250px] lg:h-screen lg:sticky h-auto -top-[8px] p-4 rounded-lg shadow`}>
        {isAdmin ?
          <ul>
            <li className='cursor-pointer rounded-full flex items-center justify-center gap-2 py-2 px-7 mt-5  mb-5 shadow-md'><Link to='/' className='flex gap-2 items-center'><IoHomeOutline /> Home</Link></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="adminDashboard">Admin Dashboard</NavLink></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="profile">Profile</NavLink></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="manage-users">Manage Users
            </NavLink></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="approved-premium">Approved Premium</NavLink></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="approved-contact-requests">Approved Contact Request</NavLink></li>
            <li>
              <NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="success-stories">Success Stories</NavLink>
            </li>
            <li className='cursor-pointer rounded-lg flex items-center justify-center gap-2 py-2 px-7 mt-5 shadow-md'><button onClick={handleLogout} className='flex gap-2 items-center'> <IoIosLogOut /> Logout</button></li>
          </ul> : <ul>
          <li className='cursor-pointer rounded-full flex items-center justify-center gap-2 py-2 px-7 mt-5  mb-5 shadow-md'><Link to='/' className='flex gap-2 items-center'><IoHomeOutline /> Home</Link></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="userDashboard">User Dashboard</NavLink></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="edit-bio">Edit Biodata</NavLink></li>
            <li><NavLink className='p-2 mb-2  block text-lg border-b border-white cursor-pointer' to="view-bio">View Biodata</NavLink></li>
            <li><NavLink className='p-2 mb-2 block text-lg border-b border-white cursor-pointer' to="my-contact-requests">My Contact Requests</NavLink></li>
            <li><NavLink className='p-2 mb-2 block text-lg border-b border-white cursor-pointer' to="favourites-bio">Favourites Biodata</NavLink></li>
            <li>
              <NavLink className='p-2 mb-2 block text-lg border-b border-white cursor-pointer' to="got-married">Got Married</NavLink>
            </li>
            <li className='cursor-pointer rounded-lg flex items-center justify-center gap-2 py-2 px-7 mt-5 shadow-md'><button onClick={handleLogout} className='flex gap-2 items-center'> <IoIosLogOut /> Logout</button></li>
          </ul>}
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  )
}
