import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For Navigation
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { FaFilter } from "react-icons/fa";

const Biodatas = () => {
  const [filters, setFilters] = useState({ ageRange: [0, 80], gender: "", present_division: "" });
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { data: biodata, refetch, error, isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bios`);
      return result.data;
    }
  })
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (error) {
    console.log(error)
  }

  const filteredBiodatas = biodata
    .filter((b) => b.age >= filters.ageRange[0] && b.age <= filters.ageRange[1])
    .filter((b) => (filters.gender ? b.gender === filters.gender : true))
    .filter((b) => (filters.present_division ? b.present_division === filters.present_division : true));

  return (
    <div className="section-container mx-auto py-10 flex gap-6">
      {/* Left Side - Filters */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex gap-5 items-center text-[#e57339]"><FaFilter /> Filter Biodata</h2>
        
        <label className="block font-semibold">Age Range</label>
        <input type="range" min="18" max="60" value={filters.ageRange[0]} className="w-full mt-2" onChange={(e) => setFilters({ ...filters, ageRange: [e.target.value, filters.ageRange[1]] })} />
        <input type="range" min="18" max="60" value={filters.ageRange[1]} className="w-full" onChange={(e) => setFilters({ ...filters, ageRange: [filters.ageRange[0], e.target.value] })} />
        <p className="text-gray-700">Age: {filters.ageRange[0]} - {filters.ageRange[1]}</p>

        <label className="block mt-4 font-semibold">Biodata Type</label>
        <select className="w-full p-2 border rounded" onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
          <option value="">All</option><option value="Male">Male</option><option value="Female">Female</option>
        </select>

        <label className="block mt-4 font-semibold">Division</label>
        <select className="w-full p-2 border rounded" onChange={(e) => setFilters({ ...filters, present_division: e.target.value })}>
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

      {/* Right Side - Biodata List */}
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBiodatas.map((b) => (
          <div key={b.bio_id} className="bg-white p-4 shadow-lg rounded-lg text-center">
            <img src={b.profile_image} alt="Profile" className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300" />
            <h3 className="text-lg font-semibold">{b.gender}</h3>
            <p className="text-gray-600">{b.present_division}</p>
            <p className="text-gray-600">{b.age} years</p>
            <p className="text-gray-600">{b.occupation}</p>
            <button className="mt-2 px-4 py-2 bg-[#e57339] text-white rounded hover:bg-[#e57339]"><Link to={`/biodata/${b.bio_id}`}>View Profile </Link></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Biodatas;
