import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const MessagesByTag = () => {
    const { tagname } = useParams(); // Récupère le nom du tag depuis l'URL
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    // Couleurs pour les tags
    const tagColors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-purple-200'];

    // Fonction pour récupérer les messages avec un tag spécifique
    const fetchMessagesByTag = async () => {
        try {
            const response = await axios.get(`http://localhost:3310/tags/${tagname}`);

            // Récupérer les informations utilisateur pour chaque message
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
            setError("Erreur lors de la récupération des messages par tag");
        }
    };

    useEffect(() => {
        fetchMessagesByTag();
    }, [tagname]);

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {error && <p className="text-red-500">{error}</p>}
                
                <h2 className="text-lg font-semibold mb-2">Messages avec le tag : {tagname}</h2>
                <ul className="mt-4 space-y-4">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <li key={message.id} className="p-6 border border-gray-300 rounded-lg shadow w-full max-w-md mb-4 bg-white">
                                <div className="prose">
                                    <div className="flex items-center space-x-2.5 mb-2">
                                        <img 
                                            src={message.userPicture ? message.userPicture : '../../images/NOPICTURE.PNG'} 
                                            alt={`${message.username}`} 
                                            className="w-10 h-10 object-cover rounded-full border-2 border-pink-500 ring-2 "
                                        />
                                        <div>
                                            <strong>{message.username}</strong>
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
                            </li>
                        ))
                    ) : (
                        <p>Aucun message trouvé pour ce tag.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MessagesByTag;


