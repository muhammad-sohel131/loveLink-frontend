import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../../utils/imageUpload';
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import DataLoading from '../../../Component/DataLoading/DataLoading';

export default function GotMarried() {
    const { user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const [rating, setRating] = useState(0); 

    const { data, error, isLoading } = useQuery({
        queryKey: ["Viewbiodata"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/bios/${user.email}`);
            return result.data;
        }
    });

    const onSubmit = async (formData) => {
        setProcessing(true)
        const currentData = {};
        try {
            if (formData.profile_image.length > 0) {
                const resImage = await imageUpload(formData.profile_image[0]);
                currentData.profile_image = resImage.data?.display_url;
            } else {
                currentData.profile_image = data.profile_image;
            }
            if (data.gender === 'Male') {
                currentData.maleId = formData.selfId;
                currentData.femaleId = formData.partnerId;
            } else {
                currentData.femaleId = formData.selfId;
                currentData.maleId = formData.partnerId;
            }
            currentData.feedback = formData.feedback;
            currentData.marriageDate = formData.marriageDate; 
            currentData.rating = rating; 

            const bioRes = await axiosSecure.post('/gotMarried', currentData);
            toast.success("Saved the changes!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to save the changes!");
        }
        setProcessing(false)
    };

    if (isLoading) {
        return <DataLoading />
    }

    return (
        <div className="m-5 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#e57339] mb-4">Submit Your Feedback</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                
                <div>
                    <label className="block text-gray-700">Self Biodata Id:</label>
                    <input readOnly defaultValue={data?.bio_id} {...register("selfId")} type="number" name="selfId" className="w-full p-2 border rounded" />
                    {errors.selfId && <p className="text-red-500 text-sm">Self Bio Id is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Partner Bio Id:</label>
                    <input type="number" {...register("partnerId", { required: true })} className="w-full p-2 border rounded" />
                    {errors.partnerId && <p className="text-red-500 text-sm">Your Partner Id is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Marriage Date:</label>
                    <input type="date" {...register("marriageDate", { required: true })} className="w-full p-2 border rounded" />
                    {errors.marriageDate && <p className="text-red-500 text-sm">Marriage Date is required</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Profile Image:</label>
                    <input type="file" {...register("profile_image")} accept="image/*" className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-gray-700">Feedback:</label>
                    <textarea type="text" {...register("feedback", { required: true })} className="w-full p-2 border rounded" />
                    {errors.feedback && <p className="text-red-500 text-sm">Your feedback is required</p>}
                </div>

                {/* Star Rating System */}
                <div>
                    <label className="block text-gray-700">Rate Your Experience:</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <button disabled={processing} type="submit" className="w-full bg-[#e57339] text-white py-2 rounded hover:bg-[#cc6633]">
                    {processing ? 'Processing' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
