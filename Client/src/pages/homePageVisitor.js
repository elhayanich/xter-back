import React from 'react';
import Message from '../components/Message'; 
import Navbar from '../components/Header/Navbar';
import AddFakeUsers from '../components/addFakeUsers';

const HomePageVisitor = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <AddFakeUsers />
             <Navbar />
            <Message />
        </div>
    );
};

export default HomePageVisitor;
