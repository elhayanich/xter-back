import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch('http://localhost:3310/messages'); // Assure-toi que le port est correct
      const data = await response.json();
      setMessage(data.content); // Utilise le contenu du message
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