// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReactionButtons = ({ messageId, userId }) => {
//     const [reactionTypes, setReactionTypes] = useState([]);
//     const [reactionCounts, setReactionCounts] = useState({});

//     // Fetch reaction types
//     const fetchReactionTypes = async () => {
//         try {
//             const response = await axios.get('http://localhost:3310/reactiontypes');
//             setReactionTypes(response.data);
//         } catch (err) {
//             console.error("Error fetching reaction types:", err);
//         }
//     };

//     // Fetch reaction counts for the specific message
//     const fetchReactions = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3310/reactions/${messageId}/reactions`);
//             const counts = {};

//             // Count occurrences of each reaction type
//             response.data.forEach(reaction => {
//                 counts[reaction.reaction_id] = (counts[reaction.reaction_id] || 0) + 1;
//             });

//             setReactionCounts(counts);
//         } catch (err) {
//             console.error("Error fetching reactions:", err);
//         }
//     };

//     // Handle the reaction button click
//     const handleReaction = async (reactionId) => {
//         try {
//             await axios.post(`http://localhost:3310/reactions/${messageId}/reactions`, {
//                 user_id: userId,
//                 message_id: messageId,
//                 reaction_id: reactionId
//             });
//             fetchReactions(); // Refresh the reaction counts after a new reaction is added
//         } catch (err) {
//             console.error("Error posting reaction:", err.response ? err.response.data : err.message);
//         }
//     };

//     useEffect(() => {
//         fetchReactionTypes();
//         fetchReactions();
//     }, [messageId]);

//     return (
//         <div className="flex space-x-4 mt-2">
//             {reactionTypes.map((reactionType) => (
//                 <button
//                     key={reactionType.id}
//                     onClick={() => handleReaction(reactionType.id)}
//                     className="flex items-center text-blue-500 hover:text-blue-700 space-x-1"
//                 >
//                     <img src={reactionType.picture} alt={reactionType.name} className="w-6 h-6" />
//                     <span>{reactionCounts[reactionType.id] || 0}</span>
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default ReactionButtons;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReactionButtons = ({ messageId, userId }) => {
    const [reactionTypes, setReactionTypes] = useState([]);
    const [reactionCounts, setReactionCounts] = useState({});
    const [userReactions, setUserReactions] = useState({}); // Track user reactions to prevent duplicates

    // Fetch reaction types
    const fetchReactionTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3310/reactiontypes');
            setReactionTypes(response.data);
        } catch (err) {
            console.error("Error fetching reaction types:", err);
        }
    };

    // Fetch reaction counts for the specific message
    const fetchReactions = async () => {
        try {
            const response = await axios.get(`http://localhost:3310/reactions/${messageId}/reactions`);
            const counts = {};
            const userReactionTracker = {};  // To track if the user has reacted to a type

            // Count occurrences of each reaction type and track user reactions
            response.data.forEach(reaction => {
                counts[reaction.reaction_id] = (counts[reaction.reaction_id] || 0) + 1;
                if (reaction.user_id === userId) {
                    userReactionTracker[reaction.reaction_id] = true;
                }
            });

            setReactionCounts(counts);
            setUserReactions(userReactionTracker); // Initialize user's reaction tracking
        } catch (err) {
            console.error("Error fetching reactions:", err);
        }
    };

    // Handle the reaction button click
    const handleReaction = async (reactionId) => {
        // Check if the user already reacted with this reaction type
        if (userReactions[reactionId]) {
            return; // Exit if user already reacted
        }

        try {
            await axios.post(`http://localhost:3310/reactions/${messageId}/reactions`, {
                user_id: userId,
                message_id: messageId,
                reaction_id: reactionId
            });

            // Update the reaction count and user's reaction status in the frontend
            setReactionCounts(prevCounts => ({
                ...prevCounts,
                [reactionId]: (prevCounts[reactionId] || 0) + 1
            }));

            setUserReactions(prevUserReactions => ({
                ...prevUserReactions,
                [reactionId]: true
            }));
        } catch (err) {
            console.error("Error posting reaction:", err.response ? err.response.data : err.message);
        }
    };

    useEffect(() => {
        fetchReactionTypes();
        fetchReactions();
    }, [messageId]);

    return (
        <div className="flex space-x-4 mt-2">
            {reactionTypes.map((reactionType) => (
                <button
                    key={reactionType.id}
                    onClick={() => handleReaction(reactionType.id)}
                    disabled={userReactions[reactionType.id]} // Disable if user has already reacted
                    className={`flex items-center space-x-1 ${userReactions[reactionType.id] ? 'text-gray-400' : 'text-blue-500 hover:text-blue-700'}`}
                >
                    <img src={reactionType.picture} alt={reactionType.name} className="w-6 h-6" />
                    <span>{reactionCounts[reactionType.id] || 0}</span>
                </button>
            ))}
        </div>
    );
};

export default ReactionButtons;
