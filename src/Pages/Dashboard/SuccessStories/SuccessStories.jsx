import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";

const successStories = [
  {
    id: 1,
    maleBiodataId: "M1234",
    femaleBiodataId: "F5678",
    story: "We met through this platform, and now we are happily married!",
  },
  {
    id: 2,
    maleBiodataId: "M2345",
    femaleBiodataId: "F6789",
    story: "Thanks to Love Link, we found our perfect match!",
  },
];



export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState(null);

  const axiosPublic = useAxiosPublic();
  const { data:successStories, isLoading} = useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
        const result = await axiosPublic.get(`/gotMarried`);
        return result.data;
    },
});

if(isLoading){
  return <h2>Loading.....</h2>
}

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Success Stories
      </h2>
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-3">Male Biodata ID</th>
              <th className="border p-3">Female Biodata ID</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {successStories.map((story) => (
              <tr key={story.selfId} className="text-center">
                <td className="border p-3">{story.maleId}</td>
                <td className="border p-3">{story.femaleId}</td>
                <td className="border p-3">
                  <button
                    className="bg-[#e57339] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#cf5c22] transition"
                    onClick={() => setSelectedStory(story)}
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">Success Story</h3>
            <p className="text-gray-700 mb-4">{selectedStory.feedback}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setSelectedStory(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
