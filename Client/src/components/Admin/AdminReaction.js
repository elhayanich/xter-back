import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin_reaction.css';

const AdminReactions = () => {
    const [reactions, setReactions] = useState([]);
    const [error, setError] = useState("");
    const [editStates, setEditStates] = useState({});
    const [newReactionUrl, setNewReactionUrl] = useState("");
    

    // Fonction pour récupérer les réactions
    const fetchReactions = async () => {
        try {
            const response = await axios.get('http://localhost:3310/reactiontypes');
            setReactions(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des réactions:", err);
            setError("Erreur lors de la récupération des réactions");
        }
    };

    // Fonction pour supprimer une réaction
    const handleDeleteReaction = async (reactionId) => {
        try {
            await axios.delete(`http://localhost:3310/reactiontypes/${reactionId}`);
            setReactions(reactions.filter(reaction => reaction.id !== reactionId));
        } catch (err) {
            console.error("Erreur lors de la suppression de la réaction:", err);
            setError("Erreur lors de la suppression de la réaction");
        }
    };

    // Fonction pour mettre à jour l'URL d'une réaction
    const handleUpdateReaction = async (reactionId) => {
        try {
            await axios.patch(`http://localhost:3310/reactiontypes/${reactionId}`, {
                picture_url: newReactionUrl
            });
            fetchReactions(); 
            setEditStates({ ...editStates, [reactionId]: false }); 
            setNewReactionUrl(""); 
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
            {error && <p className="error">{error}</p>}

            <h2>Liste des réactions</h2>
            <ul>
                {reactions.map(reaction => (
                    <li key={reaction.id}>
                        <div className="reaction-info">
                            <img 
                                src={reaction.picture_url} 
                                alt="Réaction" 
                                style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                            />
                            <span>{reaction.reaction_type}</span>
                        </div>
                        <button onClick={() => handleDeleteReaction(reaction.id)}>Supprimer</button>
                        
                        {editStates[reaction.id] ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={newReactionUrl} 
                                    onChange={(e) => setNewReactionUrl(e.target.value)} 
                                    placeholder="Nouvelle URL de l'image" 
                                />
                                <button onClick={() => handleUpdateReaction(reaction.id)}>Mettre à jour</button>
                                <button onClick={() => setEditStates({ ...editStates, [reaction.id]: false })}>
                                    Annuler
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => {
                                setEditStates({ ...editStates, [reaction.id]: true });
                                setNewReactionUrl(reaction.picture_url); 
                            }}>
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
