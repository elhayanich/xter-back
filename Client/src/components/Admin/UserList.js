import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]); 
    const [error, setError] = useState(null); 
    const [showUsers, setShowUsers] = useState(false); // Ajout d'état pour l'affichage de la liste des utilisateurs

    // Récupérer les utilisateurs lorsque le composant se monte
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3310/admin/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
                setError("Erreur lors de la récupération des utilisateurs");
            }
        };

        fetchUsers(); // Appel de fetchUsers pour récupérer les utilisateurs
    }, []); // Le tableau vide [] permet de lancer l'effet seulement une fois au montage du composant

    // Fonction pour basculer l'affichage de la liste des utilisateurs
    const toggleUserList = () => {
        setShowUsers(prevShowUsers => !prevShowUsers);
    };

    // Fonction pour supprimer un utilisateur par son nom d'utilisateur
    const handleDeleteUser = async (username) => {
        try {
            await axios.delete(`http://localhost:3310/admin/users/${username}`);
            setUsers(users.filter(user => user.username !== username)); // Mise à jour de la liste
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <button 
                    onClick={toggleUserList} 
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    {showUsers ? 'Masquer la liste des utilisateurs' : 'Afficher les utilisateurs'}
                </button>
                
                {error && <p className="text-red-500">{error}</p>}
                
                {showUsers && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Liste des utilisateurs</h3>
                        <ul>
                            {users.map(user => (
                                <li key={user.id} className="flex justify-between items-center p-2 border-b">
                                    <span>{user.username}</span>
                                    <button 
                                        onClick={() => handleDeleteUser(user.username)} 
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;
