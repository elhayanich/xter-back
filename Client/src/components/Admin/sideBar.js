import React from "react";
import "./SideBar.css";
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideBar = () => {
  return (
    <SideNav
      onSelect={(selected) => {
        // Logique de navigation ici
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="Général">

        <NavItem eventKey="Général">
          <NavText style={{ color: 'white', backgroundColor: '#ec4899', padding: '1em', borderRadius: '5px' }}>
            Général
          </NavText>
        </NavItem>

        <NavItem eventKey="Réaction">
          <NavText style={{ color: 'white', backgroundColor: '#ec4899', padding: '1em', borderRadius: '5px' }}>
            Réaction
          </NavText>
        </NavItem>

        <NavItem eventKey="Utilisateurs">
          <NavText style={{ color: 'white', backgroundColor: '#ec4899', padding: '1em', borderRadius: '5px' }}>
            Utilisateurs
          </NavText>
        </NavItem>

      </SideNav.Nav>
    </SideNav>
  );
};

export default SideBar;
