import React from "react"
import "./sideBar.css"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


<SideNav
    onSelect={(selected) => {
        // Pas encore fait les routes qui doivent être liées, import { Link } from "react-router-dom";
        // exemple pour route :  <Route path="/Général" component={props => <Général />} />
        // a mettre avant SideNav.Toggle : <Router>
    //<Route render={({ location, history }) => (
        //<React.Fragment>
           // <SideNav
               // onSelect={(selected) => {
                   // const to = '/' + selected;
                  //  if (location.pathname !== to) {
                      //  history.push(to);

    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="Général">
        <NavItem eventKey="Général" style={{ backgroundColor: '#ec4899',  transition: '0.3s' }}>
         </NavItem>
            <NavText style={{ color: 'white' }}>
                Général
            </NavText>


        <NavItem eventKey="Réaction"  style={{ backgroundColor: '#ec4899', transition: '0.3s' }}>
            <NavText style={{ color: 'white' }}>
                Réaction
            </NavText>
        </NavItem>


        <NavItem eventKey="Utilisateurs" style={{ backgroundColor: '#ec4899', transition: '0.3s' }}>
          <NavText style={{ color: 'white' }}>
                Utilisateurs
            </NavText>
            
           
        </NavItem>
    </SideNav.Nav>
</SideNav>


