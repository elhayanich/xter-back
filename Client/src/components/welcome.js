import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import useGetCurrentUser from './useGetCurrentUser';
import Confetti from 'react-confetti'; 

const Welcome = () => {
    const { userName, id: currentUserId } = useGetCurrentUser();  
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (currentUserId) {
            setShowConfetti(true);

            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 5000); 

            return () => clearTimeout(timer);
        }
    }, [currentUserId]);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow mb-4 border-4 border-pink-500">
            {showConfetti && <Confetti />}

            {currentUserId ? (
                <>
                    <h2 className="text-3xl font-bold text-pink-500">Bienvenue, {userName} !</h2>
                    <p className="mt-2">
                        Accédez à votre profil en cliquant sur le lien ci-dessous :
                    </p>
                    <Link 
                        to={`/user/${currentUserId}`} 
                        className="text-blue-500 mt-2 inline-block">
                        Voir mon profil
                    </Link>
                </>
            ) : (
                <p>Chargement...</p> 
            )}
        </div>
    );
};

export default Welcome;



