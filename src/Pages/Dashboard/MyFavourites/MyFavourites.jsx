import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublis";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";

const MyFavourites = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext)
    const { data: favourites, isError, isLoading, refetch } = useQuery({
        queryKey: ["favourites"],
        queryFn: async () => {
            const result = await axiosPublic.get(`/favourites/${user.email}`);
            return result.data;
        },
    });
    if (isError) {
        console.log(isError)
    }
    if (isLoading) {
        return <h2>Loading....</h2>
    }
    const handleDelete = async (id) => {
        try{
            const result = await axiosPublic.delete(`favourites/${id}`);
            refetch()
            toast.success("Deleted Successfully!");
        }catch(err){
            toast.error("Something Wrong!")
            console.log(err)
        }
    };

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">📌 My Favourite Biodata</h2>

            {favourites.length === 0 ? (
                <p className="text-gray-600 text-center">No favourite biodata added yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Biodata ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Permanent Address</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Occupation</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favourites.map((biodata) => (
                                <tr key={biodata.bio_id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{biodata.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{biodata.bio_id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{biodata.permanent_division}</td>
                                    <td className="border border-gray-300 px-4 py-2">{biodata.occupation}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(biodata.bio_id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            Delete ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFavourites;
