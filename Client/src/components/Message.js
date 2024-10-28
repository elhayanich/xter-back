import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";

const Message = () => {
    const [messages, setMessages] = useState([]);  
    const [error, setError] = useState(null);
    const [replyTo, setReplyTo] = useState(null);  // ID du message auquel on répond
    const [replyContent, setReplyContent] = useState(''); // Contenu de la réponse

    // Fetch initial messages
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

    // Fonction pour envoyer une réponse
    const handleReplySubmit = async (messageId) => {
        if (replyContent.trim()) {
            try {
                await axios.post('http://localhost:3310/messages/reply', {
                    user_id: 1,  // ID utilisateur statique, à adapter selon votre logique
                    content: replyContent,
                    parent_id: messageId,  // ID du message parent pour hiérarchiser la réponse
                });
                setReplyContent('');  // Réinitialiser le contenu de la réponse
                setReplyTo(null);  // Réinitialiser l'ID de réponse

                // Recharger les messages pour inclure la nouvelle réponse
                const response = await axios.get('http://localhost:3310/messages');
                setMessages(response.data);
            } catch (error) {
                setError('Erreur lors de l\'envoi de la réponse');
            }
        }
    };

    // Fonction récursive pour afficher les messages et leurs réponses
    const renderMessage = (message) => (
        <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow bg-white w-full max-w-md mb-4">
            <p><strong>Utilisateur {message.user_id}:</strong> {message.content}</p>
            <p><em>Posté le : {new Date(message.date_post).toLocaleString()}</em></p>
            <p className="mt-2"><strong>Tags:</strong> {message.tags ? message.tags.split(',').map(tag => <span key={tag} className="text-blue-500 mr-2">{tag.trim()}</span>) : "Aucun tag"}</p>

            {/* Option pour répondre au message */}
            <button onClick={() => setReplyTo(message.id)} className="text-blue-500 mt-2">Répondre</button>

            {/* Formulaire de réponse si le message est celui auquel on répond */}
            {replyTo === message.id && (
                <div className="mt-4">
                    <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={`Répondre à @Utilisateur ${message.user_id}`}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={() => handleReplySubmit(message.id)}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                        Envoyer
                    </button>
                </div>
            )}

            {/* Afficher les réponses récursivement */}
            {message.replies && message.replies.length > 0 && (
                <ul className="pl-6 border-l-2 border-gray-300 mt-4">
                    {message.replies.map(reply => renderMessage(reply))}
                </ul>
            )}
        </li>
    );

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
                                <p className="prose"><strong>Utilisateur {message.user_id}:</strong> 
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



