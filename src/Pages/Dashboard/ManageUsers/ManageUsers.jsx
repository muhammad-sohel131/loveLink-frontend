import { useState, useEffect, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  let biodata = [];

  const { data: biodatas, refetch, error, isLoading } = useQuery({
    queryKey: ["Managebiodatas"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bios`);
      return result.data.biodatas;
    }
  })


  if (isLoading) {
    return <h2>Loading...</h2>
  }
  
  if(biodatas){
    console.log(biodatas)
    biodata = biodatas.filter(user => !user.isAdmin)
  }
  // Make user premium
  const handleMakeAdmin = async (biodataId) => {
    try {
      const response = await axiosSecure.put(`makeAdmin/${biodataId}`);
      refetch();
      toast.success("Made Admin Successfully!")
    } catch (err) {
      console.log(err)
      toast.error("Something Wrong during Make Admin")
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
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {biodata.map((user) => (
              !user.isAdmin &&
              <tr key={user?.bio_id} className="text-center">
                <td className="border px-4 py-2">{user?.name}</td>
                <td className="border px-4 py-2">{user?.email}</td>
                <td className="border px-4 py-2">
                  <button
                    disabled={user.isAdmin}
                    onClick={() => handleMakeAdmin(user.bio_id)}
                    className="bg-[#e57339] text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Make Admin
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

export default ManageUsers;
