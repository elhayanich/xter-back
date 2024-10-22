import React from 'react';
import MessageInput from '../components/messageInput';
import Message from '../components/Message'; 

const HomePage = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <MessageInput />
            <Message />
        </div>
    );
};

export default HomePage;


