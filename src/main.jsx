import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { routes } from './Routes/routes';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer} from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <HelmetProvider>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer></ToastContainer>
    </HelmetProvider>
    </AuthProvider>
  </StrictMode>
)
