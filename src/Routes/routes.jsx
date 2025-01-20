import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Biodatas from "../Pages/Biodatas/Biodatas";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import PrivateRoute from "./PrivateRoute";
import EditBio from "../Pages/Dashboard/EditBio/EditBio";
import ViewBiodata from "../Pages/Dashboard/ViewBioData/ViewBioData";
import MyContactRequests from "../Pages/Dashboard/MyContactRequests/MyContactRequests";
import FavouritesBio from "../Pages/Dashboard/FavouriteBio/FavouritesBio";

export const routes =  createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "biodatas",
                element: <Biodatas />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Registration />
            }
        ]
    },
    {
        path:"dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "userHome",
                element: <UserHome />
            },
            {
                path: "edit-bio",
                element: <EditBio />
            },
            {
                path: "view-bio",
                element: <ViewBiodata />
            },
            {
                path: "my-contact-requests",
                element: <MyContactRequests />
            },
            {
                path: "favourites-bio",
                element: <FavouritesBio />
            }
        ]
    }
])