import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";

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
                
                <h2 className="text-lg font-semibold mb-2">Messages avec Tags</h2>
                <ul className="mt-4 space-y-4"> 
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow bg-white w-full max-w-md"> 
                                {/* prose : permet d'accepter les titres par # avec tailwind (cf plugins) */}
                                <p class="prose"><strong>Utilisateur {message.user_id}:</strong> 
                                {/* Affichage du contenu du message en Markdown */}
                                <ReactMarkdown>{message.content}</ReactMarkdown></p>
                                <p><em>Posté le : {new Date(message.date_post).toLocaleString()}</em></p>
                                <p className="mt-2"><strong>Tags:</strong> {message.tags ? message.tags.split(',').map(tag => <span key={tag} className="text-blue-500 mr-2">{tag.trim()}</span>) : "Aucun tag"}</p>
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



