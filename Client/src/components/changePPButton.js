import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChangePictureButton = () => {
    const {user_id} = useParams()
    const [showURLBtn, setShowURLBtn] = useState(false); {/*Le bouton Url donne accès à un input*/}
    const [imageUrl, setImageUrl] = useState('')

    // Affiche-cache les input pour upload
    const handleURLBtnClick = () => {
        setShowURLBtn(!showURLBtn);}

    //Changer photo par url
    const handleURLUpload = async () => {
        if (!imageUrl) {
            alert("Veuillez entrer une URL d'image.");
            return;}
        try {
            const response = await axios.post(`http://localhost:3310/user/${user_id}/uploadImgUrl`, { url: imageUrl })
            alert("Image uploadée avec succès");
            setImageUrl('') //réinitialiser champ url après upload
        } catch (error) {
            console.error("Erreur lors de l'upload :", error);
            alert("Erreur lors de l'upload de l'image.");}}
    


    return (
        <div className="flex justify-center items-center">
            <div className="flex-col  bg-white p-1 rounded-lg shadow-lg w-full max-w-md mb-4 p-5 w-full">
                {/*Boutons upload photo*/}
                <div>
                    <p className="text-base text-pink-500 font-medium pb-3 flex justify-center items-center">Veuillez choisir une nouvelle image.</p>
                    <div className='pb-5 flex justify-center items-center'>
                        <button
                                type="button"
                                // onClick={}
                                className="w-16 bg-gray-500 text-white text-sm hover:bg-gray-600 transition pt-0.5 pb-0.5 rounded-md mr-5"
                            > Local</button>
                        <button
                                type="button"
                                onClick={handleURLBtnClick}
                                className="w-16 bg-gray-500 text-white text-sm hover:bg-gray-600 transition pt-0.5 pb-0.5 rounded-md"
                            > Url</button>
                </div>
                </div>
                {/*Inputs local / url*/}
                <div>
                    {showURLBtn && 
                        <div className='flex justify-center flex-col items-center'>
                            <div className='pb-5'>
                                <label className='text-base text-pink-500 font-normal pb-5 flex justify-center items-center'>Veuillez entrer l'url de votre image</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className='border-2 border border-gray-300 rounded-lg w-full pt-'></input>
                            </div>
                            <div className='flex justify-center items-center'>
                                <button onClick={handleURLUpload} className="bg-pink-500 text-white px-10 ps-5 rounded hover:bg-pink-600 transition">
                                    Upload
                                </button>
                            </div>
                        </div>
                        }
                </div>
            </div>
        </div>
    );
};

export default ChangePictureButton;