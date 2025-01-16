import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from "react-hook-form"

export default function Registration() {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <>
            <Helmet>
                <title>Register</title>
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
