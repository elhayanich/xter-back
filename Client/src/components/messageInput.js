// J'ai demandé à chat GPT de générer les commentaires pour expliquer le code , derien


import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MessageInput() {
    const [message, setMessage] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    // Fonction pour gérer les changements dans le champ de message
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    // Fonction pour gérer les changements dans le champ de tag
    const handleTagChange = (event) => {
        setTagInput(event.target.value);
    };

    // Fonction pour ajouter un tag
    const handleAddTag = () => {
        if (tagInput) { // Vérifie si le champ n'est pas vide
            const formattedTag = tagInput.startsWith('#') ? tagInput : `#${tagInput}`;
            if (!tags.includes(formattedTag)) { // Évite les doublons
                setTags([...tags, formattedTag]); // Ajoute le tag à la liste
                setTagInput(''); // Réinitialise le champ d'entrée de tag
            }
        }
    };

    // Fonction pour soumettre le message et les tags
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        try {
            // Envoi des tags
            const tagData = tags.map(tagname => ({ tagname }));
            const tagResponse = await axios.post('http://localhost:3310/tags', tagData);

            // Récupération des IDs des tags
            const tagIds = tagResponse.data.map(tag => tag.id);

            // Préparation des données de message
            const messageData = {
                user_id: 1, // ID d'utilisateur statique
                content: message,
                tag_ids: tagIds,
            };

            // Envoi du message
            await axios.post('http://localhost:3310/messages', messageData);
            toast.success("Votre message a été publié !");
            setMessage(''); // Réinitialise le champ de message
            setTags([]); // Réinitialise la liste de tags
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4"> 
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea //J'ai changé "input" en "textarea" pour éviter l'envoi par entrée et permettre le retour à la ligne
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Écrire un message..."
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagChange}
                            placeholder="Ajouter un tag (ex: #amitié)"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            Ajouter
                        </button>
                    </div>

                    <div className="mb-4">
                        {tags.length > 0 && (
                            <div className="flex flex-wrap">
                                {tags.map((tag, index) => (
                                    <span key={index} className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-lg">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-pink-500 text-white rounded-lg"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
