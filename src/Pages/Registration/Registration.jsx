import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../Provider/AuthProvider';
import { imageUpload } from '../../utils/imageUpload';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/UseAxiosPublic';

export default function Registration() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const saveToDatabase = async (newUser) => {
        const currentData = {
            name: newUser.name,
            email: newUser.email,
            profile_image: newUser.image
        }
        try {
            const bioRes = await axiosPublic.post('/bios', currentData)
            toast.success("Saved the changes!")
        } catch (err) {
            console.log(err)
            toast.error("Failed to save the changes!")
        }
    }

    const onSubmit = (data) => {
        setProcessing(true)
        const image = data.image[0];
        imageUpload(image)
            .then(res => {
                data.image = res.data.display_url;
                createUser(data.email, data.password)
                    .then(r => {
                        updateUserProfile(data.name, data.image)
                            .then(() => {
                                console.log(data)
                                saveToDatabase(data)
                                navigate("/")
                            })
                    })
                    .catch(err => {
                        toast.error("Maybe, The email is used.")
                    })
            })
            .catch(err => {
                console.log(err)
                toast.error("Something Wrong! Please try later.")
            })
            setProcessing(false)
    }
    return (
        <>
            <Helmet>
                <title>Register | LoveLink</title>
            </Helmet>

            <div className='section-container flex justify-around items-center'>
                <div className='w-[95%]'>
                    <h2 className='my-5 text-3xl font-extrabold text-[#e57339]'>Register</h2>
                    <form className='flex flex-col bg-white shadow-lg w-full py-8 px-5 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                        <input className='rounded-lg border border-[#e57339] mb-5 p-2' type="text" placeholder='Name' {...register("name")} />
                        <input className='rounded-lg border border-[#e57339] mb-5 p-2' type="email" placeholder='Email' {...register("email")} />
                        <input className='rounded-lg border border-[#e57339] mb-5 p-2' type="password" placeholder='Password' {...register("password")} />
                        <input className='rounded-lg border border-[#e57339] mb-5 p-2' type="file" {...register("image")} />
                        <input disabled={processing} className='bg-[#e57339] cursor-pointer text-white p-2 rounded-lg' type="submit" value={processing ? 'Procesing' : 'Submit' } />
                    </form>
                </div>
                <div className='w-[95%] hidden lg:block'>
                    <iframe width="700px" height="500px" src="https://lottie.host/embed/3ecd2491-b3fa-4b84-aaae-4e4ada9e9c90/sXTx466qt2.lottie"></iframe>
                </div>
            </div>
        </>
    )
}
