import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Récupérer l'utilisateur via la page  - useParams
// Créer une route qui récupère les messages de l'usager uniquement 

const UserMessagesList = () => {
    const {user_id} = useParams();
    const [messages, setMessages] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3310/messages/${user_id}`);
                setMessages(response.data)
                console.log(setMessages)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchUser();
    }, [user_id])

    //erreur : 
    if (error) {
        return <div>Erreur: {error}</div>;
      }
      //Si user n'est pas encore disponible lors du chargement de la page (évite erreur)
    if (!messages) {
        return <div>Chargement...</div>;
    }


    return (
        <div>
            <div>Test</div>
            <div>
                Route ? 
                Test test
                {/* {setMessages} */}
            </div>
        </div>
    )
};

export default UserMessagesList;