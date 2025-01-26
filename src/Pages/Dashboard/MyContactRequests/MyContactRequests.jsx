import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../../../hooks/UseAxiosPublic"
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyContactRequests = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext)

  const { data: requests, isLoading, refetch} = useQuery({
    queryKey: ["Myrequests"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/contact-requests?auth_email=${user.email}`);
      return result.data;
    }
  })

  if(isLoading){
    return <h2>Loading.....</h2>
  }

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/contact-requests?bio_id=${id}&auth_email=${user.email}`);
      toast.success("Deleted Successful!")
      refetch()
    } catch (error) {
      console.error("Error deleting request:", error);
      console("Could not deleted!")
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">📜 My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Biodata ID</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Mobile No</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.bio_id} className="text-center border">
                <td className="border p-2">{request.name}</td>
                <td className="border p-2">{request.bio_id}</td>
                <td className="border p-2 font-semibold {request.status === 'Approved' ? 'text-green-600' : 'text-yellow-500'}">
                  {request.status}
                </td>
                <td className="border p-2">{request.status === "Approved" ? request.phone : "-"}</td>
                <td className="border p-2">{request.status === "Approved" ? request.email : "-"}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(request.bio_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequests;
