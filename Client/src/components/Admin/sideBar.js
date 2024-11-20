import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserList from "./UserList";
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import "./sideBar.css";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import AdminReactions from "./AdminReaction";

const SideBar = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(""); // Track which section is active

    const handleSelect = (selected) => {
        setActiveSection(selected); // Set the active section based on selection
        navigate(`/admin/${selected}`);
    };

    return (
        <div>
            <SideNav onSelect={handleSelect}>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="Général">
                    <NavItem eventKey="stats">
                        <NavText>Statistiques</NavText>
                    </NavItem>
                    <NavItem eventKey="Reactions">
                        <NavText>Réactions</NavText>
                    </NavItem>
                    <NavItem eventKey="Utilisateurs">
                        <NavText>Utilisateurs</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>

            {/* Render components based on the active section */}
            {activeSection === "Utilisateurs" && <UserList />}
            {activeSection === "Reactions" && <AdminReactions />}
        </div>
    );
};

export default SideBar;
