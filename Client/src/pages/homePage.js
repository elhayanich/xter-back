import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [messages, setMessages] = useState([]);  // Utilise un tableau pour les messages
  const [error, setError] = useState(null);      // Gestion des erreurs

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3310/messages');  // Assure-toi que l'URL est correcte
        const data = await response.json();
        
        if (response.ok) {
          setMessages(data);  // Mets à jour le tableau des messages
        } else {
          setError(data.message || 'Une erreur est survenue');
        }
      } catch (error) {
        setError('Erreur lors de la récupération des messages');
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Welcome to MyApp</h1>
      <h2>Messages:</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Affiche l'erreur si elle existe */}
      
      <ul>
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message.id}>
              <p><strong>Utilisateur {message.user_id}:</strong> {message.content}</p>
              <p><em>Posté le : {new Date(message.date_post).toLocaleString()}</em></p>
            </li>
          ))
        ) : (
          <p>Aucun message trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
