import { useState, useEffect } from "react";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";



const ApprovedContactRequest = () => {
    const axiosPublic = useAxiosPublic()
 
    
  const { data: requests, isLoading, refetch} = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/contact-requests?status=pending`);
      return result.data;
    }
  })

  if(isLoading){
    return <h2>Loading.....</h2>
  }

  const handleApprove = async (id, email) => {
    try {
      await axiosPublic.put(`/contact-requests?bio_id=${id}&auth_email=${email}`); 
      refetch()
      toast.success("Approvment Success!")
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Approvment is failed")
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Approved Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Biodata ID</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border">
                <td className="py-2 px-4 border">{request.name}</td>
                <td className="py-2 px-4 border">{request.email}</td>
                <td className="py-2 px-4 border">{request.bio_id}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleApprove(request.bio_id, request.auth_email)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Approve
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

export default ApprovedContactRequest;
