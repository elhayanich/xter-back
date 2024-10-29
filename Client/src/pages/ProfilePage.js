import React from 'react';
import ProfileBanner from "../components/profileBanner.js"
import ChangePictureButton from '../components/changePPButton.js';

const ProfilePage = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <ProfileBanner />
            <ChangePictureButton />
        </div>
    );
};

export default ProfilePage;


