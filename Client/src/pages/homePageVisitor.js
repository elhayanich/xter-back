import React from 'react';
import Message from '../components/Message'; 
import Navbar from '../components/Header/Navbar';

const HomePageVisitor = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
             <Navbar />
            <Message />
        </div>
    );
};

export default HomePageVisitor;
