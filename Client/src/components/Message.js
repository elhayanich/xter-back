import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import Reply from './reply';
import ReactionButtons from './reactionbuttons'; // Importation du composant ReactionButtons
import { Link } from 'react-router-dom';
import useGetCurrentUser from './useGetCurrentUser';

const Message = ({ user_id }) => {
    const [messages, setMessages] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [error, setError] = useState(null);
    const [expandedMessages, setExpandedMessages] = useState({});

    // Utilisation du hook pour récupérer les données de l'utilisateur courant
    const { id: currentUserId } = useGetCurrentUser(); 

    // Couleurs pour les tags
    const tagColors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-purple-200'];

    // Fonction pour récupérer les messages depuis l'API
    const fetchMessages = async () => {        
        try {
            const url = user_id
                ? `http://localhost:3310/messages/${user_id}/messages` 
                : `http://localhost:3310/messages`; 
            const response = await axios.get(url);

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
            setError('Erreur lors de la récupération des messages');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [user_id]);

    const handleReplySubmit = async () => {
        try {
            await fetchMessages();
        } catch (error) {
            setError('Erreur lors de la récupération des messages après la réponse');
        }
    };

    const toggleReplies = (messageId) => {
        setExpandedMessages((prev) => ({
            ...prev,
            [messageId]: !prev[messageId]
        }));
    };

    const renderMessageAndReplies = (message) => {
        return (
            <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow w-full max-w-md mb-4 bg-white">
                <div className="prose">
                    <div className="flex items-center space-x-2.5 mb-2">
                        <img 
                            src={message.userPicture ? message.userPicture : '../../images/NOPICTURE.PNG'} 
                            alt={`${message.username}`} 
                            className="w-10 h-10 object-cover rounded-full border-2 border-pink-500 ring-2 "
                        />
                        <div>
                            <Link to={`http://localhost:3000/user/${message.user_id}`}><strong>{message.username}</strong></Link>
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

                <button onClick={() => setReplyTo(message.id)} className="text-blue-500 mt-2">
                    Répondre
                </button>

                <button onClick={() => toggleReplies(message.id)} className="text-blue-500 mt-2">
                    {expandedMessages[message.id] ? "Masquer les réponses" : "Voir toutes les réponses"}
                </button>

                {replyTo === message.id && <Reply parentId={message.id} onSubmit={handleReplySubmit} />}

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
                
                <h2 className="text-lg font-semibold mb-2">Feed</h2>
                <ul className="mt-4 space-y-4">
                    {messages
                        .filter(message => message.parent_id === null)
                        .map(message => renderMessageAndReplies(message))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Message;
