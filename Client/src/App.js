import React from 'react';
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from  "./components/Header/Navbar"
import useSticky from "./hooks/useSticky.js"

const App = () => {
  return (
   <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
     <Outlet/>
   </>
  );
};

export default App;
