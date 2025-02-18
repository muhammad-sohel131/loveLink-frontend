import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { GiLovers } from "react-icons/gi";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import HeaderLoading from "../HeaderLoading/HeaderLoading";

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
    <header className="border-b border-[#e57339] relative">
      <div className="section-container flex justify-between py-5">
        {/* Logo */}
        <div className="logo">
          <h2 className="text-3xl font-extrabold flex gap-4 text-[#e57339]">
            <GiLovers /> Love Link
          </h2>
        </div>

        {/* Navigation Menu */}
        <ul className="menu lg:flex hidden gap-5 text-lg">
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
              <li className="cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>

        <div className="lg:hidden">
          <div className="text-2xl cursor-pointer" onClick={() => setOpen(prev => !prev)}>
            {isOpen ? <IoMdClose /> : <FaBars />}
          </div>
          {/* menu */}
          <div className="bg-white border border-b-[#e57] absolute left-0 z-10 top-[75px] rounded-lg w-full">
            {isOpen && <ul className="menu gap-5 p-5 text-lg">
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
                  <li className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>}
          </div>
        </div>
      </div>
    </header>
  );
}
