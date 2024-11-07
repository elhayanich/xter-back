import React from 'react';
import MessageInput from '../components/messageInput';
import Message from '../components/Message';
import NavbarLogout from '../components/Header/NavbarLogout';
import FollowFilter from '../components/followerFilter';


const HomePage = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            {/*Filtre en cours de test*/}
            <FollowFilter />
            <MessageInput />
            <Message />
            <NavbarLogout/>
        </div>
    );
};

export default HomePage;


