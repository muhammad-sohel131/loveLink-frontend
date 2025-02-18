import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import { GiLovers } from "react-icons/gi";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import HeaderLoading from "../HeaderLoading/HeaderLoading";
import { IoLogIn } from "react-icons/io5";

export default function Nav() {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false)
  const axiosSecure = useAxiosSecure();

  const { data: biodata, error, isLoading } = useQuery({
    queryKey: ["bio"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/bios/${user.email}`);
      return result.data;
    }
  });

  if (isLoading) {
    return <HeaderLoading />;
  }

  const isAdmin = biodata?.isAdmin || false;
  const url = isAdmin ? "/dashboard/adminDashboard" : "/dashboard/edit-bio";

  const handleLogout = () => {
    logOut().then(() => {
      console.log("User logged out");
    });
  };

  return (
    <header className="sticky top-0 shadow-lg bg-white z-50">
      <div className="section-container flex justify-between py-3">
        {/* Logo */}
        <div className="logo">
          <Link to='/' className="text-3xl font-extrabold flex gap-4 text-[#e57339]">
          <GiLovers /> Love Link
          </Link>
        </div>

        {/* Navigation Menu */}
        <ul className="menu lg:flex items-center hidden gap-5 text-lg">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/biodatas">Biodatas</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>

          {/* Conditional User Navigation */}
          {user ? (
            <>
              <li>
                <NavLink to={url}>Dashboard</NavLink>
              </li>
              <li className="cursor-pointer bg-[#e57339] rounded-lg flex items-center justify-start gap-2 py-2 px-7 text-white shadow-md" onClick={handleLogout}>
                <IoIosLogOut /> Logout
              </li>
            </>
          ) : (
            <li>
              <NavLink className="cursor-pointer bg-[#e57339] rounded-lg flex items-center justify-start gap-2 py-2 px-7 text-white shadow-md" to="/login"> <CiLogin /> Login</NavLink>
            </li>
          )}
        </ul>

        <div className="lg:hidden">
          <div className="text-2xl cursor-pointer" onClick={() => setOpen(prev => !prev)}>
            {isOpen ? <IoMdClose /> : <FaBars />}
          </div>
          {/* menu */}
          <div onClick={() => setOpen(!isOpen)} className="bg-white border border-b-[#e57339] absolute left-0 z-10 top-[60px] rounded-lg w-full shadow-md">
            {isOpen && <ul className="menu mobile-menu gap-5 p-5 text-lg">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/biodatas">Biodatas</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>

              {/* Conditional User Navigation */}
              {user ? (
                <>
                  <li>
                    <NavLink to={url}>Dashboard</NavLink>
                  </li>
                  <li className="cursor-pointer bg-[#e57339] rounded-lg flex items-center justify-center gap-2 py-2 px-7 mt-5 text-white shadow-md" onClick={handleLogout}>
                  <IoIosLogOut /> Logout
                  </li>
                </>
              ) : (
                <li>
                  <NavLink className="cursor-pointer bg-[#e57339] rounded-lg flex items-center justify-start gap-2 py-2 px-7 text-white shadow-md" to="/login"> <CiLogin /> Login</NavLink>
                </li>
              )}
            </ul>}
          </div>
        </div>
      </div>
    </header>
  );
}
