import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Reply from './reply'; // Composant pour répondre
import ReactionButtons from './reactionbuttons'; // Composant pour gérer les réactions
import useGetCurrentUser from './useGetCurrentUser'; // Hook pour obtenir l'utilisateur actuel

const UserMessagesList = () => {
    const { user_id } = useParams();
    const [messages, setMessages] = useState(null);
    const [error, setError] = useState(null);
    const [expandedMessages, setExpandedMessages] = useState({});
    const [replyTo, setReplyTo] = useState(null);
    const { id: currentUserId } = useGetCurrentUser();

    const tagColors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-purple-200'];

    // Définir fetchUserMessages ici pour qu'il soit accessible dans tout le composant
    const fetchUserMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:3310/messages/${user_id}/messages`);
            const messagesWithUser = await Promise.all(response.data.map(async (message) => {
                const responseUser = await axios.get(`http://localhost:3310/user/${message.user_id}`);
                return {
                    ...message,
                    username: responseUser.data.username,
                    userPicture: responseUser.data.picture
                };
            }));
            setMessages(messagesWithUser);
        } catch (error) {
            setError(error.message);
        }
    };

    // Appel de fetchUserMessages lors du premier rendu
    useEffect(() => {
        fetchUserMessages();
    }, [user_id]);

    const toggleReplies = (messageId) => {
        setExpandedMessages((prev) => ({
            ...prev,
            [messageId]: !prev[messageId]
        }));
    };

    const handleReplySubmit = async () => {
        // Vous pouvez ajouter ici la logique pour envoyer une réponse au serveur si nécessaire.
        try {
            // Recharger les messages après la réponse
            fetchUserMessages();
            setReplyTo(null); // Réinitialise après la soumission
        } catch (error) {
            setError('Erreur lors de la récupération des messages après la réponse');
        }
    };

    // Gestion des erreurs
    if (error) {
        return <div>Erreur: {error}</div>;
    }

    // Affichage en cours de chargement
    if (!messages) {
        return <div>Chargement...</div>;
    }

    // Fonction pour rendre un message et ses réponses
    const renderMessageAndReplies = (message) => {
        return (
            <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow w-full max-w-md mb-4 bg-white">
                <div className="prose">
                    <div className="flex items-center space-x-2.5 mb-2">
                        <img 
                            src={message.userPicture ? message.userPicture : '../../images/NOPICTURE.PNG'} 
                            alt={`${message.username}`} 
                            className="w-10 h-10 object-cover rounded-full border-2 border-pink-500 ring-2"
                        />
                        <div>
                            <Link to={`http://localhost:3000/user/${message.user_id}`}>
                                <strong>{message.username}</strong>
                            </Link>
                        </div>
                    </div>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <p><em>Posté le : {new Date(message.date_post).toLocaleString()}</em></p>
                <div className="mt-2 flex flex-wrap">
                    <strong className="mr-2">Tags:</strong>
                    {message.tags ? message.tags.split(',').map((tag, index) => (
                        <Link
                            key={tag}
                            to={`/tags/${tag.trim()}`}
                            className={`text-sm px-3 py-1 rounded-full mr-2 mt-1 text-black ${tagColors[index % tagColors.length]}`}
                        >
                            {tag.trim()}
                        </Link>
                    )) : "Aucun tag"}
                </div>

                {/* Boutons de réaction */}
                {currentUserId && (
                    <ReactionButtons messageId={message.id} userId={currentUserId} />
                )}

                {/* Bouton Répondre */}
                <button onClick={() => setReplyTo(message.id)} className="text-blue-500 mt-2">
                    Répondre
                </button>

                {/* Bouton pour afficher/masquer les réponses */}
                <button onClick={() => toggleReplies(message.id)} className="text-blue-500 mt-2">
                    {expandedMessages[message.id] ? "Masquer les réponses" : "Voir toutes les réponses"}
                </button>

                {/* Formulaire de réponse */}
                {replyTo === message.id && <Reply parentId={message.id} onSubmit={handleReplySubmit} />}

                {/* Affichage des réponses */}
                {expandedMessages[message.id] &&
                    <ul className="ml-6 mt-4">
                        {messages
                            .filter(reply => reply.parent_id === message.id)
                            .map(reply => renderMessageAndReplies(reply))
                        }
                    </ul>
                }
            </li>
        );
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-2">Messages de l'utilisateur</h2>
                <ul className="mt-4 space-y-4">
                    {messages
                        .filter(message => message.parent_id === null) // Seulement les messages principaux
                        .map(message => renderMessageAndReplies(message))
                    }
                </ul>
            </div>
        </div>
    );
};

export default UserMessagesList;



