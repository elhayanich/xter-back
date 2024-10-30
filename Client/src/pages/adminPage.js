import React from "react";
import SideBar from "../components/Admin/SideBar";
import Navbar_Admin from "../components/Admin/Navbar_Admin";
import GeneralInfos from "../components/Admin/GeneralInfos";


const AdminPage = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <Navbar_Admin />
            <SideBar />
            <GeneralInfos/>
        </div>
    );
};

export default AdminPage;
