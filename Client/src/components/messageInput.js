import React, { useState } from 'react';
import axios from 'axios';

export default function MessageInput() {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const messageData = {
            user_id: 1,  // Ajoutez un user_id ici pour éviter l'erreur de clé étrangère : à changer plus tard ofc quand on aura les users automatiquements
            content: message,
        };

        try {
            const response = await axios.post('http://127.0.0.1:3310/messages', messageData);
            console.log("Message envoyé :", response.data);
            setMessage(''); // remettre l'input clear après l'envoi
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4"> 
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={message}
                            onChange={handleChange}
                            placeholder="Écrire un message..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
