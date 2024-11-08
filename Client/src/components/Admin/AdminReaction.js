import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReactions = () => {
    const [reactions, setReactions] = useState([]);
    const [error, setError] = useState("");

    // Fonction pour récupérer toutes les réactions
    const fetchReactions = async () => {
        try {
            const response = await axios.get('http://localhost:3310/admin/reactions'); // URL pour récupérer toutes les réactions
            setReactions(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des réactions:", err);
            setError("Erreur lors de la récupération des réactions");
        }
    };

    // Fonction pour supprimer une réaction spécifique
    const handleDeleteReaction = async (reactionId) => {
        try {
            await axios.delete(`http://localhost:3310/admin/reaction/${reactionId}`);
            setReactions(reactions.filter(reaction => reaction.id !== reactionId)); // Mise à jour de la liste après suppression
        } catch (err) {
            console.error("Erreur lors de la suppression de la réaction:", err);
            setError("Erreur lors de la suppression de la réaction");
        }
    };

    useEffect(() => {
        fetchReactions();
    }, []);

    return (
        <div>
            <h1>Gestion des réactions</h1>
            {error && <p>{error}</p>}

            <h2>Liste des réactions</h2>
            <ul>
                {reactions.map(reaction => (
                    <li key={reaction.id}>
                        <span>{reaction.user_id} a réagi au message {reaction.message_id} avec la réaction {reaction.reaction_id}</span>
                        <button onClick={() => handleDeleteReaction(reaction.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminReactions;
