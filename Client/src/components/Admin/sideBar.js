import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserList from "./UserList";
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import "./sideBar.css";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideBar = () => {
  const navigate = useNavigate();
  const [showUserList, setShowUserList] = useState(false);

  const handleSelect = (selected) => {
    if (selected === "Utilisateurs") {
      setShowUserList(prevShow => !prevShow); // Affiche ou masque UserList
    } else {
      setShowUserList(false); // Cache UserList si une autre option est sélectionnée
    }
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

          <NavItem eventKey="Réaction">
            <NavText>Réaction</NavText>
          </NavItem>

          <NavItem eventKey="Utilisateurs">
            <NavText>Utilisateurs</NavText>
          </NavItem>

        </SideNav.Nav>
      </SideNav>

      {/* Affiche la liste des utilisateurs en dessous de la SideBar si `showUserList` est vrai */}
      {showUserList && <UserList />}
    </div>
  );
};

export default SideBar;
