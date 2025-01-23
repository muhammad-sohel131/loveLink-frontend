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
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ApprovedContact from "../Pages/Dashboard/ApprovedContact/ApprovedContact";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/ApprovedPremium/ApprovedPremium";
import BiodataDetails from "../Pages/BioDataDetails/BioDataDetails";
import MyFavourites from "../Pages/Dashboard/MyFavourites/MyFavourites";
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
                path: "biodata/:id",
                element: <PrivateRoute><BiodataDetails /></PrivateRoute>
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
                element: <MyFavourites />
            },
           
            {
                path: "adminDashboard",
                element: <AdminRoute><AdminDashboard /></AdminRoute>
            },
            {
                path: "manage-users",
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: "approved-premium",
                element: <AdminRoute><ApprovedPremium /></AdminRoute>
            },
            {
                path: "approved-contact-requests",
                element: <AdminRoute><ApprovedContact /></AdminRoute>
            }
        ]
    }
])