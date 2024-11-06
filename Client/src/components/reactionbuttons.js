import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReactionButtons = ({ messageId, userId }) => {
    const [reactionTypes, setReactionTypes] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [error, setError] = useState(null);

    // Récupérer les types de réactions depuis l'API
    const fetchReactionTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3310/reactiontypes');
            setReactionTypes(response.data);
        } catch (err) {
            setError('Erreur lors de la récupération des types de réactions');
        }
    };

    // Récupérer les réactions existantes pour ce message
    const fetchReactions = async () => {
        try {
            const response = await axios.get(`http://localhost:3310/reactions/${messageId}/reactions`);
            setReactions(response.data);
        } catch (err) {
            setError('Erreur lors de la récupération des réactions');
        }
    };

    // Ajouter une réaction
    const handleReaction = async (reactionId) => {
        try {
            await axios.post(`http://localhost:3310/reactions/${messageId}/reactions`, {
                user_id: userId,
                reaction_id: reactionId
            });
            fetchReactions(); // Récupérer les nouvelles réactions après avoir ajouté la réaction
        } catch (err) {
            setError('Erreur lors de l\'ajout de la réaction');
        }
    };

    useEffect(() => {
        fetchReactionTypes();
        fetchReactions();
    }, [messageId]);

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex space-x-4 mt-2">
                {reactionTypes.map((reactionType) => (
                    <button
                        key={reactionType.id}
                        onClick={() => handleReaction(reactionType.id)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <img src={reactionType.picture} alt={reactionType.name} className="w-6 h-6" />
                        {reactionType.name}
                    </button>
                ))}
            </div>

            <div className="mt-2">
                <strong>Réactions:</strong>
                <ul>
                    {reactions.map((reaction) => (
                        <li key={reaction.id}>
                            {reaction.reaction_name} par utilisateur {reaction.user_id}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReactionButtons;
