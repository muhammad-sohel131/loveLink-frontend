import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider'
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../../utils/imageUpload';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function GotMarried() {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();


    const { data, error, isLoading} = useQuery({
        queryKey: ["Viewbiodata"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/bios/${user.email}`);
            return result.data;
        }
    })

    const onSubmit = async (formData) => {
        const currentData = {};
       try{
        if(formData.profile_image.length > 0){
            const resImage = await imageUpload(formData.profile_image[0]);
            currentData.profile_image = resImage.data?.display_url;
        }else{
            currentData.profile_image = data.profile_image;
        }
        if(data.gender === 'Male'){
            currentData.maleId = formData.selfId
            currentData.femaleId = formData.partnerId
        }else {
            currentData.femaleId = formData.selfId
            currentData.maleId = formData.partnerId
        }
        currentData.feedback = formData.feedback
        const bioRes = await axiosSecure.post('/gotMarried', currentData)
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
            <h2 className="text-2xl font-semibold text-[#e57339] mb-4">Submit Your Feedback</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
 
                <div>
                    <label className="block text-gray-700">Self Biodata Id:</label>
                    <input readOnly defaultValue={data?.bio_id} {...register("selfId")} type="number" name="selfId" className="w-full p-2 border rounded" />
                    {errors.selfId && <p className="text-red-500 text-sm">Self Bio Id is required</p>}
                </div>
                         
                <div>
                    <label className="block text-gray-700">Partner Bio Id:</label>
                    <input type="number" {...register("partnerId")} className="w-full p-2 border rounded" />
                    {errors.partnerId && <p className="text-red-500 text-sm">Your Partner Id is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Profile Image:</label>
                    <input type="file" {...register("profile_image")} accept="image/*" className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-gray-700">Feedback:</label>
                    <textarea  type="text" {...register("feedback", { required: true })} className="w-full p-2 border rounded" />
                    {errors.feedback && <p className="text-red-500 text-sm">Your feedback is required</p>}
                </div>

                <button type="submit" className="w-full bg-[#e57339] text-white py-2 rounded hover:bg-[#cc6633]">
                    Submit
                </button>
            </form>
        </div>
    );
}
