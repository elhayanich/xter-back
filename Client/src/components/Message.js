import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
    const [messages, setMessages] = useState([]);  
    const [error, setError] = useState(null);      

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3310/messages'); 
                if (response.status === 200) {
                    setMessages(response.data); 
                }
            } catch (error) {
                setError('Erreur lors de la récupération des messages');
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
            {error && <p className="text-red-500">{error}</p>}  
            <ul className="mt-4 space-y-4"> 
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow bg-white w-full max-w-md"> 
                            <p><strong>Utilisateur {message.user_id}:</strong> {message.content}</p>
                            <p><em>Posté le : {new Date(message.date_post).toLocaleString()}</em></p>
                        </li>
                    ))
                ) : (
                    <p>Aucun message trouvé.</p>
                )}
            </ul>
            </div>
        </div>
    );
};

export default Message;




