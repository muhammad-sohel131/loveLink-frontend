import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider'
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../../utils/imageUpload';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function EditBio() {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const { data, error, isLoading} = useQuery({
        queryKey: ["Viewbiodata"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/bios/${user.email}`);
            return result.data;
        }
    })

    const onSubmit = async (currentData) => {
       try{
        if(currentData.profile_image.length > 0){
            console.log('hit')
            const resImage = await imageUpload(currentData.profile_image[0]);
            currentData.profile_image = resImage.data?.display_url;
        }else{
            currentData.profile_image = data.profile_image;
        }
        const bioRes = await axiosSecure.post('/bios', currentData)
        toast.success("Saved the changes!")
       }catch(err){
        console.log(err)
        toast.error("Failed to save the changes!")
       }
    };

    if(isLoading){
        return <h2>Loading.....</h2>
    }
    
    return (
        <div className="mx-auto mt-5 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#e57339] mb-4">Edit Bio</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                <div>
                    <label className="block text-gray-700">Gender:</label>
                    <select defaultValue={data?.gender} {...register("gender", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">Gender is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Name:</label>
                    <input defaultValue={data?.name} type="text" {...register("name", { required: true })} className="w-full p-2 border rounded" />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Profile Image:</label>
                    <input type="file" {...register("profile_image")} accept="image/*" className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-gray-700">Date of Birth:</label>
                    <input defaultValue={data?.dob} type="date" {...register("dob", { required: true })} className="w-full p-2 border rounded" />
                    {errors.dob && <p className="text-red-500 text-sm">Date of Birth is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Height:</label>
                    <select defaultValue={data?.height} {...register("height", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Height</option>
                        <option value="5'0">5'0"</option>
                        <option value="5'2">5'2"</option>
                        <option value="5'4">5'4"</option>
                        <option value="5'6">5'6"</option>
                        <option value="5'8">5'8"</option>
                        <option value="6'0">6'0"</option>
                    </select>
                    {errors.height && <p className="text-red-500 text-sm">Height is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Weight:</label>
                    <select defaultValue={data?.weight} {...register("weight", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Weight</option>
                        <option value="50kg">50 kg</option>
                        <option value="60kg">60 kg</option>
                        <option value="70kg">70 kg</option>
                        <option value="80kg">80 kg</option>
                    </select>
                    {errors.weight && <p className="text-red-500 text-sm">Weight is required</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Age:</label>
                    <input defaultValue={data?.age} {...register("age")} type="number" name="age" className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Occupation:</label>
                    <select defaultValue={data?.occupation} {...register("occupation", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Occupation</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Business">Business</option>
                    </select>
                    {errors.occupation && <p className="text-red-500 text-sm">Occupation is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Permanent Division:</label>
                    <select defaultValue={data?.permanent_division} {...register("permanent_division", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Permanent Division</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagra">Chattagra</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                    {errors.permanent_division && <p className="text-red-500 text-sm">Permanent division is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Present Division:</label>
                    <select defaultValue={data?.present_division} {...register("present_division", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Present Division</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagra">Chattagra</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                    {errors.present_division && <p className="text-red-500 text-sm">Present division is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Expected Partner Height:</label>
                    <select defaultValue={data?.expected_partner_height} {...register("expected_partner_height", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Expected Height</option>
                        <option value="5'0">5'0"</option>
                        <option value="5'2">5'2"</option>
                        <option value="5'4">5'4"</option>
                        <option value="5'6">5'6"</option>
                        <option value="5'8">5'8"</option>
                        <option value="6'0">6'0"</option>
                    </select>
                    {errors.expected_partner_height && <p className="text-red-500 text-sm">Expected partner height is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Expected Partner Weight:</label>
                    <select defaultValue={data?.expected_partner_weight} {...register("expected_partner_weight", { required: true })} className="w-full p-2 border rounded">
                        <option value="">Select Expected Weight</option>
                        <option value="50kg">50 kg</option>
                        <option value="60kg">60 kg</option>
                        <option value="70kg">70 kg</option>
                        <option value="80kg">80 kg</option>
                    </select>
                    {errors.expected_partner_weight && <p className="text-red-500 text-sm">Expected partner weight is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Mobile Number:</label>
                    <input defaultValue={data?.mobile} type="tel" {...register("mobile", { required: true })} className="w-full p-2 border rounded" />
                    {errors.mobile && <p className="text-red-500">This field is required</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Expected Partner Age:</label>
                    <input defaultValue={data?.expectedPartnerAge} type="number" {...register("expectedPartnerAge")} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Race (Skin Color):</label>
                    <select {...register("race", { required: true })} className="w-full p-2 border rounded" defaultValue={data?.race || ""}>
                        <option value="">Select Race</option>
                        <option value="Fair">Fair</option>
                        <option value="Medium">Medium</option>
                        <option value="Dark">Dark</option>
                    </select>
                    {errors.race && <p className="text-red-500 text-sm">Race is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Father's Name:</label>
                    <input defaultValue={data?.father_name} type="text" {...register("father_name", { required: true })} className="w-full p-2 border rounded" />
                    {errors.father_name && <p className="text-red-500 text-sm">Father's Name is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Mother's Name:</label>
                    <input type="text" {...register("mother_name", { required: true })} className="w-full p-2 border rounded" defaultValue={data?.mother_name} />
                    {errors.mother_name && <p className="text-red-500 text-sm">Mother's Name is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Contact Email:</label>
                    <input {...register("email")} type="email" value={user?.email} readOnly className="w-full p-2 border rounded bg-gray-200" />
                </div>

                <button type="submit" className="w-full bg-[#e57339] text-white py-2 rounded hover:bg-[#cc6633]">
                    Save And Publish Now
                </button>
            </form>
        </div>
    );
}
