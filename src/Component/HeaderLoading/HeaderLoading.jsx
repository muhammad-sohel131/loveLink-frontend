import React from 'react'
import { PropagateLoader } from 'react-spinners'
export default function HeaderLoading() {
    return (
        <div className='fixed h-screen w-screen top-0 left-0 z-30 bg-white flex items-center justify-center'>
            <div className='text-center'>
                <h2 className='text-lg mb-5'>Just a moment!</h2>
                <PropagateLoader color="#e57339" />
            </div>
        </div>
    )
}
