import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export default function AdminRoute({children}) {
    const isAdmin = true;
    const location = useLocation();

    if(isAdmin){
        return children
    }
  return <Navigate to='/login' state={{from: location}} replace></Navigate>
}
