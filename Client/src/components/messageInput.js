import React, { useState } from 'react';
import axios from 'axios';

export default function MessageInput() {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Préparez les données à envoyer
        const messageData = {
            content: message, // Assurez-vous que cela correspond à la structure attendue par votre API
        };

        try {
            // Effectuez une requête POST
            const response = await axios.post('http://localhost:3310/messages', messageData);
            console.log("Message envoyé :", response.data);
            setMessage(''); // Réinitialiser l'input après l'envoi
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Écrire un message..."
                style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#28a745', color: 'white' }}>
                Envoyer
            </button>
        </form>
    );
}
