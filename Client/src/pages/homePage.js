// import React from 'react';
// import MessageInput from '../components/messageInput';
// import Message from '../components/Message';
// import NavbarLogout from '../components/Header/NavbarLogout';
// import FollowFilter from '../components/followerFilter';


// const HomePage = () => {
//     return (
//         <div className="max-w-2xl mx-auto p-4">
//             {/*Filtre en cours de test*/}
//             <FollowFilter />
//             <MessageInput />
//             <Message />
//             <NavbarLogout/>
//         </div>
//     );
// };

// export default HomePage;

import React, { useState } from 'react';
import MessageInput from '../components/messageInput';
import Message from '../components/Message';
import NavbarLogout from '../components/Header/NavbarLogout';
import FollowFilter from '../components/followerFilter';
import useGetCurrentUser from '../components/useGetCurrentUser';

const HomePage = () => {
    const { id: currentUserId } = useGetCurrentUser();
    const [onlyFollowed, setOnlyFollowed] = useState(false); // State to track filtering
    const [btnColor, setBtnColor] = useState("pink-500");





    const toggleFilter = () => {
        setOnlyFollowed((prev) => !prev);
        setBtnColor(prevColor => prevColor === "pink-500" ? "green-500" : "pink-500");
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <FollowFilter />
            <MessageInput />
            {/* Add a filter button */}
            <button onClick={toggleFilter} className={`mt-2 px-4 py-2 bg-${btnColor}  text-white rounded-lg`}>
                {onlyFollowed ? "Afficher tous les messages" : "Afficher uniquement les abonnés"}
            </button>
            {/* Pass the filter state to Message component */}
            <Message user_id={currentUserId} onlyFollowed={onlyFollowed} />
            <NavbarLogout />
        </div>
    );
};

export default HomePage;



