import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { FaFilter } from "react-icons/fa";
import DataLoading from "../../Component/DataLoading/DataLoading";

const Biodatas = () => {
  const [filters, setFilters] = useState({ ageRange: [18, 60], gender: "", present_division: "" });
  const [page, setPage] = useState(1); // Track current page
  const limit = 6; // Biodata per page
  const axiosPublic = useAxiosPublic();

  // Fetch data with pagination
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["biodatas", page, filters],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bios?page=${page}&limit=${limit}`);
      return result.data;
    }
  });

  // if (isLoading) return <DataLoading />;
  if (error) console.log(error);

  // Extract pagination data
  const { biodatas = [], totalPages } = data || {};

  // Filter on the frontend (optional, but may affect pagination accuracy)
  const filteredBiodatas = biodatas
    .filter((b) => b.age >= filters.ageRange[0] && b.age <= filters.ageRange[1])
    .filter((b) => (filters.gender ? b.gender === filters.gender : true))
    .filter((b) => (filters.present_division ? b.present_division === filters.present_division : true));

  return (
    <div className="section-container mx-auto py-10 md:flex gap-6">
      {/* Left Side - Filters */}
      <div className="md:w-1/4 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex gap-5 items-center text-[#e57339]"><FaFilter /> Filter Biodata</h2>
        
        <label className="block font-semibold">Age Range</label>
        <input type="range" min="18" max="60" value={filters.ageRange[0]} className="w-full mt-2"
          onChange={(e) => setFilters({ ...filters, ageRange: [e.target.value, filters.ageRange[1]] })} />
        <input type="range" min="18" max="60" value={filters.ageRange[1]} className="w-full"
          onChange={(e) => setFilters({ ...filters, ageRange: [filters.ageRange[0], e.target.value] })} />
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

      {isLoading ? <DataLoading /> : 
      <div className="md:w-3/4">
      <div className="grid md:mt-0 mt-10 grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBiodatas.map((b) => (
          <div key={b.bio_id} className="bg-white p-4 shadow-lg rounded-lg text-center">
            <img src={b.profile_image} alt="Profile" className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300" />
            <h3 className="text-lg font-semibold">{b.gender}</h3>
            <p className="text-gray-600">{b.present_division}</p>
            <p className="text-gray-600">{b.age} years</p>
            <p className="text-gray-600">{b.occupation}</p>
            <button className="mt-2 px-4 py-2 bg-[#e57339] text-white rounded hover:bg-[#e57339]">
              <Link to={`/biodata/${b.bio_id}`}>View Profile</Link>
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-3">
        <button 
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-lg font-semibold">Page {page} of {totalPages}</span>

        <button 
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
}
    </div>
  );
};

export default Biodatas;
