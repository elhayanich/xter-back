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
    }, []);

    return (
        <div>
            <h1>Tableau de bord de l'administrateur</h1>

            <div>
                <h2>Statistiques</h2>
                Nombre de messages : 
                <Link to={`/messages/${stats.num_messages}`}>{stats.num_messages}</Link>
                Nombre de réactions : 
                <Link to={`/reactions/${stats.num_reactions}`}>{stats.num_reactions}</Link>
                Total utilisateurs : 
                <Link to={`/total-users/${stats.total_users}`}>{stats.num_users}</Link>
                
            </div>

            <div>
                <h2>Activité des utilisateurs récents</h2>
                <ul>
                </ul>
            </div>
        </div>
    );
};


export default AdminStats;
