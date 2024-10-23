import React, { useState } from 'react';
import axios from 'axios';

export default function MessageInput() {
    const [message, setMessage] = useState('');
    const [tagInput, setTagInput] = useState('');  // Gère l'input du tag
    const [tags, setTags] = useState([]);  // Tableau pour stocker les tags

    // Gérer l'input du message
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    // Gérer l'input du tag
    const handleTagChange = (e) => {
        setTagInput(e.target.value);
    };

    // Fonction pour ajouter un tag dans le tableau
    const handleAddTag = () => {
        // S'assurer que le tag commence par un #, sinon l'ajouter
        const formattedTag = tagInput.startsWith('#') ? tagInput : `#${tagInput}`;

        // Ajouter le tag au tableau s'il n'est pas déjà dedans et n'est pas vide
        if (formattedTag && !tags.includes(formattedTag)) {
            setTags([...tags, formattedTag]);
        }

        setTagInput('');  // Réinitialiser l'input du tag
    };

    // Gérer l'envoi du message et des tags
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Données du message à envoyer
        const messageData = {
            user_id: 1,  // Utilisateur statique, à remplacer plus tard par le vrai utilisateur
            content: message,
        };

        try {
            // Envoyer le message
            const messageResponse = await axios.post('http://localhost:3310/messages', messageData);
            console.log("Message envoyé :", messageResponse.data);

            // Envoyer les tags si des tags sont présents
            if (tags.length > 0) {
                // Formater les tags sous forme d'objets { tagname: '...' }
                const tagData = tags.map(tagname => ({ tagname }));
                await axios.post('http://localhost:3310/tags', tagData);
                console.log("Tags envoyés :", tagData);
            }

            // Réinitialiser les inputs après envoi
            setMessage('');
            setTags([]);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message ou des tags :", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4"> 
                <form onSubmit={handleSubmit}>
                    {/* Input pour le message */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Écrire un message..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Input pour les tags */}
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagChange}
                            placeholder="Ajouter un tag (ex: #amitié)"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="ml-2 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                        >
                            Ajouter
                        </button>
                    </div>

                    {/* Affichage des tags */}
                    <div className="mb-4">
                        {tags.length > 0 && (
                            <div className="flex flex-wrap">
                                {tags.map((tag, index) => (
                                    <span key={index} className="mr-2 mb-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-lg">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bouton d'envoi */}
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
