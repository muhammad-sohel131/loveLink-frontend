import React from 'react'
import { PacmanLoader } from 'react-spinners'


export default function DataLoading() {
  return (
    <div className='w-full z-30 bg-white flex items-center justify-center'>
            <div className='text-center'>
                <h2 className='text-lg mb-5'>Data Loading...</h2>
                <PacmanLoader color="#e57339" />
            </div>
        </div>
  )
}
