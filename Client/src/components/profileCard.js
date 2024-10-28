import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileCard = () => {
    const {user_id} = useParams();
    const [user, setUser] = useState(null);
    const [error, setUserError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/${user_id}`);
                setUser(response.data)
            } catch (err) {
                setUserError(err.message);
            }
        }
        fetchUser();
    }, [user_id])

    //erreur : 
    if (error) {
        return <div>Erreur: {error}</div>;
      }
      //Si user n'est pas encore disponible
    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-pink-600">{user.username}</h1>
                <p>ID: {user.id}</p>
                <p>Email: {user.email}</p>
                <p>Date d'inscription: {user.date_inscription}</p>
                <img src={user.picture} alt={`${user.username}'s profile`} />
            </div>
        </div>
    );
};

export default ProfileCard;