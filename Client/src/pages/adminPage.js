import React, { useEffect } from 'react';
import SideBar from "../components/Admin/sideBar";
import NavbarAdmin from "../components/Admin/NavbarAdmin";
import GeneralInfos from "../components/Admin/generalInfos";
import UserList from '../components/Admin/UserList';



const AdminPage = () => {


      // Vérifie si l'utilisateur a un token stocké dans localStorage
      useEffect(() => {
        const token = localStorage.getItem("token");
    
        // Si pas de token, redirige vers la page de connexion
        if (!token) {
          window.location.href = "/login"; // Redirige vers la page de login
        }
       
      }, []);
    
      return (
  
       
    
        <div className="max-w-2xl mx-auto p-4">
            <NavbarAdmin/>
            <SideBar/>
            <GeneralInfos/>
            <UserList/>{}
        </div>
    );
};

export default AdminPage;

