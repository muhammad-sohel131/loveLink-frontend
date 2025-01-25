import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";

const ProfileCards = () => {
  const [sortOrder, setSortOrder] = useState("ascending");
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const { data: profiles, error, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/premiumProfiles`);
      return result.data;
    }
  })

  if(isLoading){
    return <h2>Loading...</h2>
  }
  let sortedProfiles = [];
  if(profiles?.length > 0){
    sortedProfiles = [...profiles].sort((a, b) => {
      return sortOrder === "ascending" ? a.age - b.age : b.age - a.age;
    });
  }

  const handleViewProfile = (id) => {
    const isLoggedIn = false
    if (isLoggedIn) {
      navigate(`/profile/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="section-container">
      <div className="md:flex justify-between items-center my-10">
        <h2 className="md:text-2xl text-lg font-bold">Premium Members</h2>
        <select
          className="border p-2 rounded-md"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="ascending">Sort by Age: Ascending</option>
          <option value="descending">Sort by Age: Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedProfiles.length == 0 && <h2>No Premium Profile is Available</h2>} 
        {sortedProfiles.map((profile) => (
          <div key={profile.bio_id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={profile.profile_image}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold mt-4 text-center">{profile.bio_id}</h3>
            <p className="text-gray-600 text-center">{profile.gender}</p>
            <p className="text-gray-600 text-center">{profile.permanent_division}</p>
            <p className="text-gray-500 text-center">Age: {profile.age}</p>
            <p className="text-gray-500 text-center">{profile.occupation}</p>
            <button
              onClick={() => handleViewProfile(profile.bio_id)}
              className="mt-4 bg-[#e57339] text-white w-full py-2 rounded-md hover:bg-[#e07339] transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCards;
