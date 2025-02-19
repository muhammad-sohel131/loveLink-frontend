import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";

export default function SuccessStory() {
    const axiosPublic = useAxiosPublic();

    const { data: successStories = [], isLoading, error } = useQuery({
        queryKey: ["successStories"],
        queryFn: async () => {
            const res = await axiosPublic.get("/gotMarried");
            return res.data.sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate));
        }
    });

    if (isLoading) return <h2 className="text-center text-xl">Loading...</h2>;
    if (error) return <h2 className="text-center text-xl text-red-500">Failed to load stories</h2>;

    return (
        <section className="py-10 section-container">
            <div className="">
                <h2 className="text-3xl mb-6 font-bold">Marriage Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {successStories.map((story) => (
                        <div key={story.id} className="bg-white p-6 rounded-lg shadow-md">
                            {/* Couple Image or Male/Female Image */}
                            <img
                                src={story.profile_image}
                                alt="Couple"
                                className="w-full h-48 object-cover rounded-md"
                            />

                            <div className="mt-4">
                                <p className="text-gray-600 text-sm">Married on: <span className="font-semibold">{new Date(story.marriageDate).toLocaleDateString()}</span></p>

                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <span key={index} className={index < story.rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>★</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mt-3">{story.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
