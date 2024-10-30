import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChangePictureButtons = () => {
    const { user_id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [imagePath, setImagePath] = useState('');

    // Gestion de l'upload soit à partir d'une url soit une image locale
    const handleUpload = async () => {
        // Éviter qu'il y ait un champ vide ou les 2 pleins 
        if (!imageUrl && !imagePath) {
            alert("Veuillez entrer une URL ou choisir une image locale.");
            return;
        }
        if (imageUrl && imagePath) {
            alert("Veuillez remplir un seul champ à la fois.");
            return;
        }

        try {
            if (imageUrl) {
                // URL
                await axios.post(`http://localhost:3310/user/${user_id}/uploadImgUrl`, { url: imageUrl });
                alert("Image URL uploadée avec succès");
                setImageUrl(''); // Réinitialiser champ URL
            } else if (imagePath) {
                // local
                const formData = new FormData();
                formData.append("file", imagePath)
                await axios.post(`http://localhost:3310/user/${user_id}/uploadImgLocal`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Image locale uploadée avec succès");
                setImagePath('');
                // await axios.post(`http://localhost:3310/user/${user_id}/uploadImgLocal`, { path: imagePath });
                // alert("Image locale uploadée avec succès");
                // setImagePath(''); // idem
            }
        } catch (error) {
            console.error("Erreur lors de l'upload :", error);
            alert("Erreur lors de l'upload de l'image.");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex-col bg-white p-1 rounded-lg shadow-lg w-full max-w-md mb-4 p-5 w-full">
                <p className="text-base text-pink-500 font-medium pb-3 flex justify-center items-center">
                    Veuillez choisir une nouvelle image.
                </p>
                
                {/* Choix fichier local */}
                <div className="pb-5 flex-col justify-center items-center">
                    <input
                        type="file"
                        onChange={(e) => setImagePath(e.target.files[0] || '')}
                        className="p-2 block w-full text-sm text-gray-500 border border-pink-300 rounded-lg cursor-pointer"
                        id="file_input"
                    />
                </div>
                
                {/* URL de l'image */}
                <div className="p-2 flex w-full text-sm text-gray-500 border border-pink-300 rounded-lg cursor-pointer">
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border-1 p-1 border border-gray-300 rounded-lg w-full"
                        placeholder="Veuillez entrer l'URL de votre image"
                    />
                </div>
                
                <button
                    onClick={handleUpload}
                    className="bg-pink-500 text-white px-5 py-1 mt-4 rounded hover:bg-pink-600 transition"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default ChangePictureButtons;
