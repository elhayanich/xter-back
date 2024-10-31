import React from "react"
import "./Navbar_admin.css"
import Logo from "../../assets/images/logo.svg"
import { Link, useNavigate } from 'react-router-dom';

const Navbar_admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token"); // Supprime le token du stockage local
      navigate('/login'); // Redirige vers la page de login
  };

  return (
      <nav className="navbar">
          <div className="navbar--logo-holder">
              <img src={Logo} alt="logo" className="navbar--logo" />
              <h1>Xter</h1>
          </div>
          <div>
              <button 
                  onClick={handleLogout} 
                  className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
              >
                  Déconnexion
              </button>
              <Link 
                  to="/search" 
                  className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
              >
                  Recherche
              </Link>
          </div>
      </nav>
  );
}

export default Navbar_admin;