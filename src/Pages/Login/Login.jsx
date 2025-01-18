import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        signIn(data.email, data.password)
        .then(res => {
            console.log(res)
            toast.success("Login Successfull")
            navigate(from, {replace: true})
        })
        .catch(err => {
            console.log(err)
            toast.error("Something Wrong! Please Try Again.")
        })
    }
    const handleGoogleLogin = () => {
        googleSignIn()
        .then(res => {
            console.log(res)
            toast.success("Login Successful")
        })
        .catch(err => {
            console.log(err)
            toast.error("Something Wrong, please try again")
        })
    }
    return (
        <>
            <Helmet>
                <title>Login | Love Link</title>
            </Helmet>

            <div className='section-container flex justify-around items-center'>
                <div className='w-[95%]'>
                    <h2 className='my-5 text-3xl font-extrabold text-[#e57339]'>Login</h2>
                    <form className='flex flex-col bg-white shadow-lg w-full py-8 px-5 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                        <input className='rounded-lg border border-[#e57339] mb-5 p-2' type="email" placeholder='Email' {...register("email")} />
                        <input className='rounded-lg border border-[#e57339] mb-5 p-2' type="password" placeholder='Password' {...register("password")} />
                        <input className='bg-[#e57339] text-white p-2 cursor-pointer rounded-lg ' type="submit" value="Login" />

                        <button onClick={handleGoogleLogin} className='bg-[#000] text-[#e57339] my-5 p-2 cursor-pointer rounded-lg'>Login with Google</button>
                    </form>
                    
                </div>
                <div className='w-[95%]'>
                <iframe width="700px" height="500px" src="https://lottie.host/embed/19f4316f-dce7-4ce6-a27d-a151a94b1a42/tlk7fSWdEX.lottie"></iframe>
                </div>
            </div>
        </>
    )
}
