import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import Reply from './reply';

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [error, setError] = useState(null);
    const [expandedMessages, setExpandedMessages] = useState({});

    //récup des messages depuis notre api 
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

    // Recharger les messages après qu'un user répond à un msg 
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

    // Cette fonction inverse l’affichage des réponses pour chaque message. Quand on clique sur "Voir toutes les réponses", l'état change et affiche les réponses si elles étaient masquées, ou les masque si elles étaient visibles.
    const toggleReplies = (messageId) => {
        setExpandedMessages((prev) => ({
            ...prev,
            [messageId]: !prev[messageId]
        }));
    };

    // Fonction récursive pour afficher un message et ses réponses en cascade
    const renderMessageAndReplies = (message) => {
        return (
            <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow w-full max-w-md mb-4 bg-white">
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

                <button onClick={() => setReplyTo(message.id)} className="text-blue-500 mt-2">
                    Répondre
                </button>

                <button onClick={() => toggleReplies(message.id)} className="text-blue-500 mt-2">
                    {expandedMessages[message.id] ? "Masquer les réponses" : "Voir toutes les réponses"}
                </button>

                {replyTo === message.id && <Reply parentId={message.id} onSubmit={handleReplySubmit} />}

                {/* Afficher les réponses en cascade */}
                {expandedMessages[message.id] &&
                    <ul className="ml-6 mt-4">
                        {messages
                            .filter(reply => reply.parent_id === message.id)
                            .map(reply => renderMessageAndReplies(reply))}
                    </ul>
                }
            </li>
        );
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {error && <p className="text-red-500">{error}</p>}
                
                <h2 className="text-lg font-semibold mb-2"> feed </h2>
                <ul className="mt-4 space-y-4">
                    {messages
                        .filter(message => message.parent_id === null) // Filtre les messages principaux
                        .map(message => renderMessageAndReplies(message))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Message;
