import React from 'react';
import MessageInput from '../components/messageInput';
import Message from '../components/Message';
import NavbarLogout from '../components/Header/NavbarLogout';


const HomePage = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <MessageInput />
            <Message />
            <NavbarLogout/>
        </div>
    );
};

export default HomePage;


