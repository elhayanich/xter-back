import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';

const Message = () => {
    const [messages, setMessages] = useState([]);  
    const [error, setError] = useState(null);
    const navigate = useNavigate(); //Click sur psedo => Profile page

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

    // Naviguer vers la page de profil de l'utilisateur
    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`); 
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
                {error && <p className="text-red-500">{error}</p>}
                
                <h2 className="text-lg font-semibold mb-2">Messages avec Tags</h2>
                <ul className="mt-4 space-y-4">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow bg-white w-full max-w-md"> 
                                <p className="prose cursor-pointer" onClick={() => handleUserClick(message.user_id)}>
                                    <strong>Utilisateur {message.user_id}:</strong>
                                </p>
                                <div className="prose">
                                    <ReactMarkdown>{message.content}</ReactMarkdown>
                                </div>
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




