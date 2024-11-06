import React from "react";
import "./sideBar.css";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from 'react-router-dom';
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <SideNav
      onSelect={(selected) => {
        navigate(`/admin/${selected}`);  // Mettez à jour ici pour naviguer vers la route enfant
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="Général">
        
       
        <NavItem eventKey="stats"> {/* Nouvelle entrée pour AdminStats */}
          <NavText
            style={{
              color: 'white',
              backgroundColor: '#ec4899',
              padding: '1em',
              borderRadius: '5px'
            }}
          >
            Statistiques
          </NavText>
        </NavItem>

        <NavItem eventKey="Général">
          <NavText
            style={{
              color: 'white',
              backgroundColor: '#ec4899',
              padding: '1em',
              borderRadius: '5px'
            }}
          >
            Général
          </NavText>
        </NavItem>

        <NavItem eventKey="Réaction">
          <NavText
            style={{
              color: 'white',
              backgroundColor: '#ec4899',
              padding: '1em',
              borderRadius: '5px'
            }}
          >
            Réaction
          </NavText>
        </NavItem>

        <NavItem eventKey="Utilisateurs">
          <NavText
            style={{
              color: 'white',
              backgroundColor: '#ec4899',
              padding: '1em',
              borderRadius: '5px'
            }}
          >
            Utilisateurs
          </NavText>
        </NavItem>

      </SideNav.Nav>
    </SideNav>
  );
};

export default SideBar;
