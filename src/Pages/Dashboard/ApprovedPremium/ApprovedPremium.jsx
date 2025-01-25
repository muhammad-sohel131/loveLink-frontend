import { useState, useEffect, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";

const ApprovedPremium = () => {
  const axiosPublic = useAxiosPublic();

  const { data: biodata, refetch, isLoading } = useQuery({
    queryKey: ["premiumBiodata"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/premiumBios`);
      return result.data;
    }
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  

  // Make user premium
  const handleMakePremium = async (biodataId) => {
    try {
      const response = await axiosPublic.put(`makePremium/${biodataId}`);
      const result = await axiosPublic.delete(`/premiumBios/${biodataId}`)
      refetch();
      console.log(response,result)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Approved Premium Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Biodata ID</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {biodata.map((user) => (
              <tr key={user?.bio_id} className="text-center">
                <td className="border px-4 py-2">{user?.name}</td>
                <td className="border px-4 py-2">{user?.email}</td>
                <td className="border px-4 py-2">{user?.bio_id}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleMakePremium(user.bio_id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Make Premium
                  </button>
                </td>
              </tr>
            ))}
            {biodata.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No approval requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
