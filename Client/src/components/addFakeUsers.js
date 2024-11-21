import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";  // Importez toast de react-toastify

const AddFakeUsers = () => {
    const [error, setError] = useState('');
    const [fakeProfilesList, setFakeProfilesList] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:3310/register/fake-users")
          .then((response) => {
            setFakeProfilesList(response.data);
          })
          .catch((e) => {
            setError("Failed to load fake users");
            console.error(e);
          });
    }, []);

    const handleUsersClick = () => {
        // Utiliser Promise.all pour attendre que toutes les requêtes se terminent
        Promise.all(fakeProfilesList.map(profile => {
            const { username, email, password } = profile;
            return axios.post("http://localhost:3310/register", { username, email, password });
        }))
        .then((responses) => {
            // Afficher un toast après l'ajout de tous les utilisateurs
            toast.success("Utilisateurs ajoutés à la base de données avec succès !");
            console.log("Users added successfully:", responses);
        })
        .catch((e) => {
            setError(e.message);
            console.error("Error adding users:", e);
        });
    };

    const handleMessagesClick = () => {
        // Ajout de tous les messages via Promise.all
        axios
            .post("http://localhost:3310/messages/fake-messages") 
            .then((response) => {
                // Une fois les messages ajoutés avec succès, on affiche le toast
                toast.success("Messages ajoutés à la base de données avec succès !");
                console.log("Messages added:", response.data);
            })
            .catch((e) => {
                setError(e.message);
                console.error(e);
            });
    };

    const handleReactionsClick = () => {
        fetch("http://localhost:3310/reactions/fake-reactions")
        .then((response) => {
            // Une fois les réaction ajoutées avec succès, on affiche le toast
            toast.success("Réactions ajoutés à la base de données avec succès !");
            console.log("Reactions added:", response.data);
        })
        .catch((e) => {
            setError(e.message);
            console.error(e);
        });
    };

    return (
        <div className="flex justify-center items-center">
            <button 
                type="button" 
                onClick={handleUsersClick} 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Insertion utilisateurs
            </button>
            <button 
                type="button" 
                onClick={handleMessagesClick} 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Insertion messages
            </button>
            <button 
                type="button" 
                onClick={handleReactionsClick} 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Insertion réactions
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddFakeUsers;
