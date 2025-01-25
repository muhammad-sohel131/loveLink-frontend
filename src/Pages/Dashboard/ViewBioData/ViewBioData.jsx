import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewBiodata = () => {
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: biodata, error, isLoading } = useQuery({
        queryKey: ["biodata", user.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/bios/${user.email}`);
            return result.data;
        }
    })

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        console.log(error)
    }
    const handleMakePremium = () => {
        setIsPremiumModalOpen(true);
    };

    // Confirm premium request
    const confirmMakePremium = async () => {
        setIsPremiumModalOpen(false);
        
        const bio = {
            name : biodata.name,
            email: user.email,
            bio_id: biodata.bio_id,
        }

        const result = await axiosSecure.post("/premiumBios",bio);

        setTimeout(() => {
            alert("Your biodata has been sent for premium approval!");
            setIsPremium(true);
        }, 1000);
    };

    return (
        <div className="mx-auto w-[100%] p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">View Biodata</h2>
            <div className="lg:flex items-center gap-10">
                <div className="flex flex-col items-center">
                    <img
                        src={biodata.profile_image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-gray-300"
                    />
                    <h3 className="text-xl font-bold mt-3">{biodata.name}</h3>
                    <p className="text-gray-600">{biodata.occupation}</p>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-6">
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Biodata Type: </strong>{biodata.gender}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Date of birth: </strong>{biodata.dob}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Height: </strong>{biodata.height}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Weight: </strong>{biodata.weight}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Age: </strong>{biodata.age}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Race: </strong>{biodata.race}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Father's Name: </strong>{biodata.father_name}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Mother's Name: </strong>{biodata.mother_name}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Permanent Division: </strong>{biodata.permanent_division}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Present Division: </strong>{biodata.present_division}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Expected Partner Age: </strong>{biodata.expectedPartnerAge}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Expected Partner Height: </strong>{biodata.expected_partner_height}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Expected Partner Weight: </strong>{biodata.expected_partner_weight}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Contact Email: </strong>{biodata.email}
                    </div>
                    <div className="border p-2 rounded-md">
                        <strong className="capitalize">Mobile Number: </strong>{biodata.mobile}
                    </div>
                </div>
            </div>

            {!isPremium ? (
                <button
                    onClick={handleMakePremium}
                    className="mt-6 bg-[#e57339] text-white py-2 px-4 rounded-md w-full hover:bg-blue-700"
                >
                    Make Biodata Premium
                </button>
            ) : (
                <p className="mt-6 text-green-600 font-semibold text-center">Premium Request Sent</p>
            )}

            {/* Premium Modal */}
            {isPremiumModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Make Premium?</h3>
                        <p>Are you sure you want to send a request to make your biodata premium?</p>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setIsPremiumModalOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmMakePremium}
                                className="bg-[#e57339] text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Yes, Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBiodata;
