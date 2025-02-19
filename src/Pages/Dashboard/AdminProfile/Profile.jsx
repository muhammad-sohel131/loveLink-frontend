import { useContext} from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DataLoading from "../../../Component/DataLoading/DataLoading";

const Profile = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();

    const { data: biodata, error, isLoading } = useQuery({
        queryKey: ["biodata", user.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/bios/${user.email}`);
            return result.data;
        }
    })

    if (isLoading) {
        return <DataLoading />
    }
    if (error) {
        console.log(error)
    }

    
    return (
        <div className="p-6 bg-white shadow-md rounded-md m-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
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


           
        </div>
    );
};

export default Profile;
