import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MessageInput() {
    const [message, setMessage] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleTagChange = (event) => {
        setTagInput(event.target.value);
    };

    const handleAddTag = () => {
        if (tagInput) {
            const formattedTag = tagInput.startsWith('#') ? tagInput : `#${tagInput}`;
            if (!tags.includes(formattedTag)) {
                setTags([...tags, formattedTag]);
                setTagInput('');
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const tagData = tags.map(tagname => ({ tagname }));
            const tagResponse = await axios.post('http://localhost:3310/tags', tagData);
            const tagIds = tagResponse.data.map(tag => tag.id);

            const messageData = {
                user_id: 1,
                content: message,
                tag_ids: tagIds,
            };

            await axios.post('http://localhost:3310/messages', messageData);
            toast.success("Votre message a été publié !");
            setMessage('');
            setTags([]);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea
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

