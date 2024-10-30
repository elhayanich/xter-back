import React from "react";
import SideBar from "../components/Admin/sideBar";
import NavbarAdmin from "../components/Admin/NavbarAdmin";
import GeneralInfos from "../components/Admin/generalInfos";


const AdminPage = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <NavbarAdmin/>
            <SideBar/>
            <GeneralInfos/>
        </div>
    );
};

export default AdminPage;
