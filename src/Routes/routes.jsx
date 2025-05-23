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
import PrivateRoute from "./PrivateRoute";
import EditBio from "../Pages/Dashboard/EditBio/EditBio";
import ViewBiodata from "../Pages/Dashboard/ViewBioData/ViewBioData";
import MyContactRequests from "../Pages/Dashboard/MyContactRequests/MyContactRequests";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/ApprovedPremium/ApprovedPremium";
import MyFavourites from "../Pages/Dashboard/MyFavourites/MyFavourites";
import Checkout from "../Pages/Checkout/Checkout";
import ApprovedContactRequest from "../Pages/Dashboard/ApprovedContactRequest/ApprovedContactRequest";
import NotFound from "../Pages/NotFound/NotFound";
import GotMarried from "../Pages/Dashboard/GotMarried/GotMarried";
import SuccessStories from "../Pages/Dashboard/SuccessStories/SuccessStories";
import Profile from "../Pages/Dashboard/AdminProfile/Profile";
import UserDashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import BioDetails from "../Pages/BioDataDetails/BioDataDetails";
export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFound />,
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
                element: <BioDetails />
            },
            {
                path: "checkout/:id",
                element: <PrivateRoute><Checkout /></PrivateRoute>
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
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "userDashboard",
                element: <UserDashboard />
            },
            {
                path: "success-stories",
                element: <SuccessStories />
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
                path: "got-married",
                element: <GotMarried />
            },
            {
                path: "adminDashboard",
                element: <AdminRoute><AdminDashboard /></AdminRoute>
            },
            {
                path: 'profile',
                element: <AdminRoute><Profile /></AdminRoute>
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
                element: <AdminRoute><ApprovedContactRequest /></AdminRoute>
            }
        ]
    }
])