import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      // Récupère le jeton JWT depuis le localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('Pas de token disponible, redirection vers la page de login');
        return;  // Tu pourrais aussi rediriger l'utilisateur vers une page de connexion ici
      }

      try {
        // Effectue une requête vers ton API avec le token dans les en-têtes
        const response = await fetch('http://localhost:3310/messages', {
          headers: {
            'Authorization': `Bearer ${token}`, // Ajoute le token JWT ici
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.content);  // Utilise le contenu du message
        } else {
          console.error('Erreur lors de la récupération du message');
        }
      } catch (error) {
        console.error('Erreur de connexion avec le serveur:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Welcome to MyApp</h1>
      <h2>Message: {message}</h2> {/* Affiche le message */}
    </div>
  );
};

export default HomePage;
