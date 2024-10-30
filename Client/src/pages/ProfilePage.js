import React from 'react';
import ProfileBanner from "../components/profileBanner.js"
import ChangePictureButtons from '../components/changePPButton.js';
import { useState } from 'react';

const ProfilePage = () => {
    //Faire apparaître ou disparaître les boutons upload image
    const [showButtons, setShowButtons] = useState(false);
    const handleImageClick = () => {
        setShowButtons(!showButtons);}

    return (
        <div className="max-w-2xl mx-auto p-4">
            <ProfileBanner onImageClick={handleImageClick} />
            {showButtons && <ChangePictureButtons />}
        </div>
    );
};

export default ProfilePage;


