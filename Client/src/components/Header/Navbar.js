import React from "react"
import "./Navbar.css"
import Logo from "../../assets/images/logo.svg"
import { Link } from "react-router-dom";


const Navbar = () => (
  <nav className="navbar">
    <div className="navbar--logo-holder">
      <img src={Logo} alt="logo" className="navbar--logo" />
      <h1> Xter</h1>
    </div>
    <div className={styles.user}>
    <Link to="/login" className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition">Connexion</Link>
    <Link to="/register"className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition">Inscription</Link>
    </div>
  </nav>
)
export default Navbar