import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";

export default function SuccessCounter() {
    const axiosPublic = useAxiosPublic();

    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ["biodataStats"],
        queryFn: async () => {
            const res = await axiosPublic.get("/biodataStats"); 
            return res.data;
        }
    });

    if (isLoading) return <h2 className="text-center text-xl">Loading...</h2>;
    if (error) return <h2 className="text-center text-xl text-red-500">Failed to load statistics</h2>;

    return (
        <section className="mt-10 bg-[#e57339] py-10 text-white">
            <div className="max-w-6xl mx-auto px-5">
                <h2 className="text-3xl font-bold text-center mb-8">Our Success at a Glance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    
                    {/* Total Biodata Count */}
                    <div className="bg-white text-[#e57339] p-6 rounded-lg shadow-md">
                        <h3 className="text-4xl font-bold">{stats.totalBiodata || 0}</h3>
                        <p className="text-lg font-semibold mt-2">Total Biodata</p>
                    </div>

                    {/* Total Girls' Biodata Count */}
                    <div className="bg-white text-[#e57339] p-6 rounded-lg shadow-md">
                        <h3 className="text-4xl font-bold">{stats.totalGirls || 0}</h3>
                        <p className="text-lg font-semibold mt-2">Girls' Biodata</p>
                    </div>

                    {/* Total Boys' Biodata Count */}
                    <div className="bg-white text-[#e57339] p-6 rounded-lg shadow-md">
                        <h3 className="text-4xl font-bold">{stats.totalBoys || 0}</h3>
                        <p className="text-lg font-semibold mt-2">Boys' Biodata</p>
                    </div>

                    {/* Total Marriages Completed */}
                    <div className="bg-white text-[#e57339] p-6 rounded-lg shadow-md">
                        <h3 className="text-4xl font-bold">{stats.totalMarriages || 0}</h3>
                        <p className="text-lg font-semibold mt-2">Marriages Completed</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
