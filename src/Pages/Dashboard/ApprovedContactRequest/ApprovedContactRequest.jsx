import { useState, useEffect } from "react";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DataLoading from "../../../Component/DataLoading/DataLoading";



const ApprovedContactRequest = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure();
 
    
  const { data: requests, isLoading, refetch} = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/contact-requests?status=pending`);
      return result.data;
    }
  })

  if(isLoading){
    return <DataLoading />
  }

  const handleApprove = async (id, email) => {
    try {
      await axiosSecure.put(`/contact-requests?bio_id=${id}&auth_email=${email}`); 
      refetch()
      toast.success("Approvment Success!")
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Approvment is failed")
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Approved Contact Requests</h2>
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
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
