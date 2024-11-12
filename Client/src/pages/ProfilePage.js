import React from 'react';
import ProfileBanner from "../components/profileBanner.js"
import ChangePictureButtons from '../components/changePPButton.js';
import FollowBtn from '../components/followBtn.js';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserMessagesList from '../components/userMessages.js';

const ProfilePage = () => {
    const {user_id} = useParams();
    //Faire apparaître ou disparaître les boutons upload image
    const [showButtons, setShowButtons] = useState(false);
    const handleImageClick = () => {
        setShowButtons(!showButtons);}

    return (
        <div className="max-w-2xl mx-auto p-4">
            <ProfileBanner onImageClick={handleImageClick} user_id={user_id} />
            {showButtons && <ChangePictureButtons />}
            <FollowBtn user_id={user_id} />
            <UserMessagesList user_id={user_id} />
        </div>
    );
};

export default ProfilePage;

