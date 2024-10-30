import React from "react"
import "./Navbar_admin.css"
import Logo from "../../assets/images/logo.svg"
import { Link } from "react-router-dom";


const Navbar_admin = () => (
  <nav className="navbar">
    <div className="navbar--logo-holder">
      <img src={Logo} alt="logo" className="navbar--logo" />
      <h1> Xter</h1>
    </div>
    <div>
    <Link to="/logout" className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition">Déconnexion</Link>
    <Link to="/search"className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition">Recherche</Link>
    </div>
  </nav>
)
export default Navbar_admin