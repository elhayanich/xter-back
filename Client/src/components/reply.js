// import React, { useState } from 'react';
// import axios from 'axios';
// import useGetCurrentUser from './useGetCurrentUser';

// export default function Reply({ parentId, onSubmit }) {
//     const [replyContent, setReplyContent] = useState('');
//     const [tagInput, setTagInput] = useState('');
//     const [tags, setTags] = useState([]);

//     const { id} = useGetCurrentUser();

//     const handleReplyChange = (event) => {
//         setReplyContent(event.target.value);
//     };

//     const handleTagChange = (event) => {
//         setTagInput(event.target.value);
//     };

//     const handleAddTag = () => {
//         if (tagInput) {
//             const formattedTag = tagInput.startsWith('#') ? tagInput : `#${tagInput}`;
//             if (!tags.includes(formattedTag)) {
//                 setTags([...tags, formattedTag]);
//                 setTagInput('');
//             }
//         }
//     };

//     const handleReplySubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const tagData = tags.map(tagname => ({ tagname }));
//             const tagResponse = await axios.post('http://localhost:3310/tags', tagData);
//             const tagIds = tagResponse.data.map(tag => tag.id);


//             const replyData = {
//                 user_id: id,
//                 content: replyContent,
//                 tag_ids: tagIds,
//                 parent_id: parentId,
//             };

//             await axios.post('http://localhost:3310/messages', replyData);
//             setReplyContent('');
//             setTags([]);
//             onSubmit();
//         } catch (error) {
//             console.error("Erreur lors de l'envoi de la réponse :", error);
//         }
//     };

//     return (
//         <div className="mt-4">
//             <input
//                 type="text"
//                 value={replyContent}
//                 onChange={handleReplyChange}
//                 placeholder="Écrire une réponse..."
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//             <div className="flex mt-2">
//                 <input
//                     type="text"
//                     value={tagInput}
//                     onChange={handleTagChange}
//                     placeholder="Ajouter un tag (ex: #réponse)"
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                 />
//                 <button
//                     type="button"
//                     onClick={handleAddTag}
//                     className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
//                 >
//                     Ajouter
//                 </button>
//             </div>
//             <div className="mt-2">
//                 {tags.length > 0 && (
//                     <div className="flex flex-wrap">
//                         {tags.map((tag, index) => (
//                             <span key={index} className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-lg">
//                                 {tag}
//                             </span>
//                         ))}
//                     </div>
//                 )}
//             </div>
//             <button
//                 onClick={handleReplySubmit}
//                 className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg"
//             >
//                 Envoyer la réponse
//             </button>
//         </div>
//     );
// }

import React, { useState } from 'react';
import axios from 'axios';
import useGetCurrentUser from './useGetCurrentUser';

export default function Reply({ parentId, onSubmit, onNewMessage }) {
    const [replyContent, setReplyContent] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    const { id } = useGetCurrentUser();

    // Couleurs pour les tags
    const tagColors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-purple-200'];

    const handleReplyChange = (event) => {
        setReplyContent(event.target.value);
    };

    const handleTagChange = (event) => {
        setTagInput(event.target.value);
    };

    const handleAddTag = () => {
        if (tagInput) {
            const formattedTag = tagInput.startsWith('#') ? tagInput.slice(1) : tagInput;
            if (!tags.includes(formattedTag)) {
                setTags([...tags, formattedTag]);
                setTagInput('');
            }
        }
    };

    const handleReplySubmit = async (event) => {
        event.preventDefault();
        try {
            const tagData = tags.map(tagname => ({ tagname }));

            // Enregistrer les tags sur le backend
            const tagResponse = await axios.post('http://localhost:3310/tags', tagData);
            const tagIds = tagResponse.data.map(tag => tag.id);

            const replyData = {
                user_id: id,
                content: replyContent,
                tag_ids: tagIds,
                parent_id: parentId,
            };

            // Enregistrer la réponse sur le backend
            await axios.post('http://localhost:3310/messages', replyData);

            // Mise à jour des messages dans MessagesByTag
            if (onNewMessage) {
                onNewMessage(replyData);
            }

            setReplyContent('');
            setTags([]);
            onSubmit();  // Appeler la fonction pour fermer le formulaire de réponse
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réponse :", error);
        }
    };

    return (
        <div className="mt-4">
            <input
                type="text"
                value={replyContent}
                onChange={handleReplyChange}
                placeholder="Écrire une réponse..."
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <div className="flex mt-2">
                <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagChange}
                    placeholder="Ajouter un tag (ex: réponse)"
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
            <div className="mt-2">
                {tags.length > 0 && (
                    <div className="flex flex-wrap">
                        {tags.map((tag, index) => (
                            <span key={index} className={`mr-2 mb-2 px-3 py-1 rounded-lg ${tagColors[index % tagColors.length]}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <button
                onClick={handleReplySubmit}
                className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg"
            >
                Envoyer la réponse
            </button>
        </div>
    );
}
