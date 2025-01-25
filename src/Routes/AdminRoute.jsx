import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/UseAxiosPublic';
import { AuthContext } from '../Provider/AuthProvider';

export default function AdminRoute({children}) {
   let isAdmin = false

    const location = useLocation();

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext)
    const { data: bio, isError, isLoading, refetch } = useQuery({
      queryKey: ["bio"],
      queryFn: async () => {
        const result = await axiosPublic.get(`/bios/${user.email}`);
        return result.data;
      },
    });

    if(isLoading){
      return <h2>Loading....</h2>
    }

   isAdmin = bio?.isAdmin;

   console.log(isAdmin)
    if(isAdmin){
        return children
    }
  return <Navigate to='/login' state={{from: location}} replace></Navigate>
}
