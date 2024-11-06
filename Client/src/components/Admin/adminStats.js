import { useState, useEffect } from 'react';
import axios from 'axios';

const adminStats = () => {
    const [stats, setStats] = useState({ num_messages: 0, num_reactions: 0, active_users: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h2>Statistiques de la plateforme</h2>
            <p>Nombre de messages : {stats.num_messages}</p>
            <p>Nombre de réactions : {stats.num_reactions}</p>
            <p>Utilisateurs actifs : {stats.active_users}</p>
        </div>
    );
};

export default adminStats;
