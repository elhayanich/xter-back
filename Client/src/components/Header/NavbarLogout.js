import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from 'react-router-dom';

const NavbarLogout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Fonction de déconnexion
  const handleLogout = () => {
      localStorage.removeItem("token"); // Supprime le token du stockage local
      setIsAuthenticated(false); // Met à jour l’état de connexion
      navigate('/login'); // Redirige vers login
  };

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Met à jour l'état en fonction de la présence du token
  }, []);

  return (
      <nav className="navbar">
          <div className="navbar--logo-holder">
              <img src={Logo} alt="logo" className="navbar--logo" />
              <h1>Xter</h1>
          </div>
          <div>
              {isAuthenticated ? (
                  <button 
                      onClick={handleLogout} 
                      className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
                  >
                      Déconnexion
                  </button>
              ) : (
                  <Link 
                      to="/login" 
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                      Déconnexion
                  </Link>
              )}
          </div>
      </nav>
  );
}

export default NavbarLogout;
