
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Slider() {
  const [filters, setFilters] = useState({})

  return (
    <div style={{ backgroundImage: `url(/couple1.jpg)` }} className='h-[75vh] bg-blend-overlay bg-[rgba(0,0,0,.5)] bg-no-repeat bg-cover bg-center flex items-center justify-center'>
      <div className='text-center section-container'>
        <h2 className='md:text-4xl text-3xl text-white font-bold'>Find Your Perfect Match</h2>
        <div className='flex flex-col md:flex-row justify-center items-stretch mt-8'>
          <div className='md:flex md:w-[50vw] w-full'>
            <select className="w-full p-2 py-3 md:mb-0 mb-5 border rounded-md md:rounded-tr-none md:rounded-br-none" onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
              <option value="">All</option><option value="Male">Male</option><option value="Female">Female</option>
            </select>

            <select className="w-full p-2 py-3 border md:rounded-none rounded-md" onChange={(e) => setFilters({ ...filters, present_division: e.target.value })}>
              <option value="">All</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattagram">Chattagram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>
          <button className="mt-4 md:mt-0 bg-[#e57339] text-lg font-bold text-white py-3 px-12 md:rounded-tl-none md:rounded-bl-none rounded-md hover:bg-[#e07339] transition"
          >
            <Link state={filters} to={`/biodatas`}>View Profile</Link>
          </button>
        </div>

      </div>
    </div>
  );
};