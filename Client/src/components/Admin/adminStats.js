import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminStats = () => {

    const [stats, setStats] = useState({
        num_messages: 0,
        num_reactions: 0,
        num_users: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsResponse = await axios.get('http://localhost:3310/admin/stats');
                setStats(statsResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques", error);
            }
        };

        fetchData();
    }, []); // fetchData est appelé au montage du composant

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Tableau de bord de l'administrateur</h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
                    <p>
                        Nombre de messages : 
                        <Link to={`/messages/${stats.num_messages}`} className="text-blue-500 ml-2">
                            {stats.num_messages}
                        </Link>
                    </p>
                    <p>
                        Nombre de réactions : 
                        <Link to={`/reactions/${stats.num_reactions}`} className="text-blue-500 ml-2">
                            {stats.num_reactions}
                        </Link>
                    </p>
                    <p>
                        Total utilisateurs : 
                        <Link to={`/total-users/${stats.num_users}`} className="text-blue-500 ml-2">
                            {stats.num_users}
                        </Link>
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Activité des utilisateurs récents</h2>
                    <ul>
                        {/* Vous pouvez ajouter ici des éléments pour afficher l'activité des utilisateurs */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
