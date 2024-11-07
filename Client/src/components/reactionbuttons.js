import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReactionButtons = ({ messageId, userId }) => {
    console.log(userId);
    
    const [reactionTypes, setReactionTypes] = useState([]);

    const fetchReactionTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3310/reactiontypes');
            setReactionTypes(response.data);
        } catch (err) {
        }
    };

    const handleReaction = async (reactionId) => {
        try {
            await axios.post(`http://localhost:3310/reactions/${messageId}/reactions`, {
                user_id: userId,
                message_id: messageId,
                reaction_id: reactionId
            });
        } catch (err) {
            console.error("Error posting reaction:", err.response ? err.response.data : err.message);
        }
    };
    useEffect(() => {
        fetchReactionTypes();
    }, []); 

    return (
        <div>
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
        </div>
    );
};

export default ReactionButtons;

