import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin_reaction.css'; 

const AdminReactions = () => {
    const [reactions, setReactions] = useState([]);
    const [error, setError] = useState("");
    const [editReactionId, setEditReactionId] = useState(null);
    const [newReactionType, setNewReactionType] = useState("");

    // Fonction pour récupérer toutes les réactions
    const fetchReactions = async () => {
        try {
            const response = await axios.get('http://localhost:3310/admin/reactions');
            setReactions(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des réactions:", err);
            setError("Erreur lors de la récupération des réactions");
        }
    };

    // Fonction pour supprimer une réaction spécifique
    const handleDeleteReaction = async (reactionId) => {
        try {
            await axios.delete(`http://localhost:3310/admin/reactions/${reactionId}`);
            setReactions(reactions.filter(reaction => reaction.id !== reactionId));
        } catch (err) {
            console.error("Erreur lors de la suppression de la réaction:", err);
            setError("Erreur lors de la suppression de la réaction");
        }
    };

    // Fonction pour mettre à jour une réaction
    const handleUpdateReaction = async (reactionId) => {
        try {
            await axios.patch(`http://localhost:3310/admin/reactions/${reactionId}`, {
                reaction_type: newReactionType
            });
            fetchReactions();
            setEditReactionId(null);
            setNewReactionType("");
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la réaction:", err);
            setError("Erreur lors de la mise à jour de la réaction");
        }
    };

    useEffect(() => {
        fetchReactions();
    }, []);

    return (
        <div className="container">
            <h1>Gestion des réactions</h1>
            {error && <p>{error}</p>}

            <h2>Liste des réactions</h2>
            <ul>
                {reactions.map(reaction => (
                    <li key={reaction.id}>
                        <span>{reaction.user_id}  {reaction.message_id}  {reaction.reaction_id}</span>
                        <button onClick={() => handleDeleteReaction(reaction.id)}>Supprimer</button>
                        {editReactionId === reaction.id ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={newReactionType} 
                                    onChange={(e) => setNewReactionType(e.target.value)} 
                                    placeholder="Nouveau type de réaction" 
                                />
                                <button onClick={() => handleUpdateReaction(reaction.id)}>Mettre à jour</button>
                                <button onClick={() => setEditReactionId(null)}>Annuler</button>
                            </div>
                        ) : (
                            <button onClick={() => setEditReactionId(reaction.id)}>
                                Modifier
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminReactions;
