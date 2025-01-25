import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../Provider/AuthProvider';
import { imageUpload } from '../../utils/imageUpload';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const image = data.image[0];
        imageUpload(image)
        .then(res => {
            data.image = res.data.display_url;
            console.log(data)
            createUser(data.email, data.password)
            .then(r => {
                updateUserProfile(data.name, data.image)
                .then(() => {
                    toast.success("Registration successful!");
                    navigate("/")
                })
            })
        })
        .catch(err => {
            console.log(err)
            toast.error("Something Wrong! Please try later.")
        })
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
                        <input className='bg-[#e57339] text-white p-2 rounded-lg ' type="submit" />
                    </form>
                </div>
                <div className='w-[95%]'>
                <iframe  width="700px" height="500px" src="https://lottie.host/embed/3ecd2491-b3fa-4b84-aaae-4e4ada9e9c90/sXTx466qt2.lottie"></iframe>
                </div>
            </div>
        </>
    )
}
