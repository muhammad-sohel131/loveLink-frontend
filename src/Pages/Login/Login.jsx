import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        console.log(res);
        toast.success("Login Successfull");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong! on Please Try Again.");
      });
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        toast.success("Login Successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong, please --- try again");
      });
  };
  return (
    <>
      <Helmet>
        <title>Login | Love Link</title>
      </Helmet>

      <div className="section-container flex justify-around items-center">
        <div className="w-[95%]">
          <h2 className="my-5 text-3xl font-extrabold text-[#e57339]">Login</h2>
          <div className="bg-white shadow-lg w-full py-8 px-5 rounded-lg">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="rounded-lg border border-[#e57339] mb-5 p-2"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <input
              className="rounded-lg border border-[#e57339] mb-5 p-2"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <input
              className="bg-[#e57339] text-xl font-bold text-white p-2 cursor-pointer rounded-lg "
              type="submit"
              value="Login"
            />
          </form>
          <button
            onClick={handleGoogleLogin}
            className="bg-[#fff] my-5 p-2 cursor-pointer w-full rounded-lg flex items-center gap-5 justify-center border border-black text-xl font-bold"
          >
            <FcGoogle />
            Login with Google
          </button>

          <p>
            Do not have account?{" "}
            <Link className="text-[#e57339]" to="/register">
              Register
            </Link>
          </p>
          </div>
        </div>
        <div className="w-[95%] hidden lg:block">
          <iframe
            width="700px"
            height="500px"
            src="https://lottie.host/embed/19f4316f-dce7-4ce6-a27d-a151a94b1a42/tlk7fSWdEX.lottie"
          ></iframe>
        </div>
      </div>
    </>
  );
}
