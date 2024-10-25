import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MessageInput() {
    const [message, setMessage] = useState('');
    const [tagInput, setTagInput] = useState('');  
    const [tags, setTags] = useState([]);  

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleTagChange = (e) => {
        setTagInput(e.target.value);
    };

   
    const handleAddTag = () => {
        const formattedTag = tagInput.startsWith('#') ? tagInput : `#${tagInput}`;

       
        if (formattedTag && !tags.includes(formattedTag)) {
            setTags([...tags, formattedTag]);
        }

        setTagInput('');  
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const messageData = {
            user_id: 1,  // Utilisateur statique, à remplacer plus tard par le vrai utilisateur of course
            content: message,
        };

        try {
            const messageResponse = await axios.post('http://localhost:3310/messages', messageData);
            console.log("Message envoyé :", messageResponse.data);
            if (tags.length > 0) {
                const tagData = tags.map(tagname => ({ tagname }));
                await axios.post('http://localhost:3310/tags', tagData);
                console.log("Tags envoyés :", tagData);
            }
            toast.success("Votre message à été publié !");
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
                    <div className="mb-4">
                        <input
                            type="text"
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Écrire un message..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
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
