import React, { useState } from 'react';
import MessageInput from '../components/messageInput';
import Message from '../components/Message';
import useGetCurrentUser from '../components/useGetCurrentUser';
import NavbarLogout from '../components/Header/NavbarLogout';
import Welcome from '../components/welcome'; 

const HomePage = () => {
    const { id: currentUserId, userName: currentUserName } = useGetCurrentUser(); 
    const [onlyFollowed, setOnlyFollowed] = useState(false); 
    const [btnColor, setBtnColor] = useState("pink-500");

    const toggleFilter = () => {
        setOnlyFollowed((prev) => !prev);
        setBtnColor(prevColor => prevColor === "pink-500" ? "green-500" : "pink-500");
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {currentUserName && currentUserId && <Welcome currentUserName={currentUserName} user_id={currentUserId} />} 
            <MessageInput />
            <button onClick={toggleFilter} className={`mt-2 px-4 py-2 bg-${btnColor} text-white rounded-lg`}>
                {onlyFollowed ? "Afficher tous les messages" : "Afficher uniquement les abonnés"}
            </button>
            <Message user_id={currentUserId} onlyFollowed={onlyFollowed} />
            <NavbarLogout />
        </div>
    );
};

export default HomePage;

