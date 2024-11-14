import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showUsers, setShowUsers] = useState(false);

    // Récupérer les utilisateurs lorsque le composant se monte
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3310/admin');
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
                setError("Erreur lors de la récupération des utilisateurs");
            }
        };

        fetchUsers();
    }, []);

    // Fonction pour basculer l'affichage de la liste des utilisateurs
    const toggleUserList = () => {
        setShowUsers(prevShowUsers => !prevShowUsers);
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3310/admin/${userId}`);
            setUsers(users.filter(user => user.id !== userId)); // Mise à jour de la liste après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
            setError("Erreur lors de la suppression de l'utilisateur");
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
                                        onClick={() => deleteUser(user.id)}
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
