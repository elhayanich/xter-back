import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import Reply from './reply';

const Message = () => {
    const [messages, setMessages] = useState([]);  
    const [replyTo, setReplyTo] = useState(null);  
    const [error, setError] = useState(null);
    const [activeParentId, setActiveParentId] = useState(null); // État pour suivre le parent actif

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

    const scrollToMessage = (messageId) => {
        const messageElement = document.getElementById(`message-${messageId}`);
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth' });

            // Définir l'ID du parent actif
            setActiveParentId(messageId);
            // Remettre à null après 6 secondes
            setTimeout(() => {
                setActiveParentId(null);
            }, 6000); // 6000 ms = 6 secondes
        }
    };

    const handleReplySubmit = async () => {
        try {
            const response = await axios.get('http://localhost:3310/messages');
            if (response.status === 200) {
                setMessages(response.data);
            }
        } catch (error) {
            setError('Erreur lors de la récupération des messages après la réponse');
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
                {error && <p className="text-red-500">{error}</p>}
                
                <h2 className="text-lg font-semibold mb-2">Messages avec Tags</h2>
                <ul className="mt-4 space-y-4">
                    {messages.length > 0 ? (
                        messages.map((message) => {
                            console.log(`Message ID: ${message.id}, Parent ID: ${message.parent_id}`); // Log pour débogage
                            return (
                                <li 
                                    key={message.id} 
                                    id={`message-${message.id}`} 
                                    className={`p-6 border border-gray-300 rounded-lg shadow w-full max-w-md ${activeParentId === message.id ? 'bg-pink-100' : 'bg-white'}`} // Changez l'arrière-plan si c'est le parent actif
                                >
                                    <p className="prose">
                                        <strong>Utilisateur {message.user_id}:</strong> 
                                        <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </p>
                                    <p><em>Posté le : {new Date(message.date_post).toLocaleString()}</em></p>
                                    <p className="mt-2">
                                        <strong>Tags:</strong> 
                                        {message.tags ? message.tags.split(',').map(tag => (
                                            <span key={tag} className="text-blue-500 mr-2">{tag.trim()}</span>
                                        )) : "Aucun tag"}
                                    </p>
                                    
                                    {message.parent_id && (
                                        <button 
                                            onClick={() => scrollToMessage(message.parent_id)} 
                                            className="text-blue-500 mt-2"
                                        >
                                            Voir le message parent
                                        </button>
                                    )}
                                    
                                    <button 
                                        onClick={() => setReplyTo(message.id)} 
                                        className="text-blue-500 mt-2"
                                    >
                                        Répondre
                                    </button>

                                    {replyTo === message.id && (
                                        <Reply parentId={message.id} onSubmit={handleReplySubmit} />
                                    )}
                                </li>
                            );
                        })
                    ) : (
                        <p>Aucun message trouvé.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Message;

