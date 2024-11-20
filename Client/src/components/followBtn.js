import { useState, useEffect, React } from "react";
import axios from 'axios';
import useGetCurrentUser from "./useGetCurrentUser";
import { useLocation } from 'react-router-dom';

const FollowBtn = () => {
     
    const location = useLocation(); // récupérer l'id du followed via l'url ↓
    const path = location.pathname.split("/user/");
    const followed = parseInt(path[1]) // transformer le followed en int car vient en string
    const follower = useGetCurrentUser().id ?? null; //null ok pour ne pas afficher si pas registered
    const [error, setError] = useState('');
    const [btnColor, setBtnColor] = useState("bg-pink-500")
    const [btnMessg, setBtnMessg] = useState("")

    //Check si follow
    useEffect(() => {
        if (follower && followed) { // vérifier que les paramètres soient pas vides
            isFollowing(follower, followed);
        }
    }, [follower, followed]); 
    


    // Bouton follow
    const handleClick = async (followed, follower) => {
        try {
            await axios.post(`http://localhost:3310/user/follow/${followed}`, {
                follower: follower,
                followed: followed,
           })
        }
        catch (err) {
            setError(err.message);
        }
    }

    // Récupérer si l'utilisateur est abonné ou pas 
    const isFollowing = async (follower, followed) => {
        try {
            let result = await axios.get(`http://localhost:3310/user/follow/${followed}/${follower}`, 
            )
            console.log(result)
            // gérer l'affichage du bouton follow en f° 
            if (result.data.follow_status == "no") {
                setBtnColor("bg-pink-500");
                setBtnMessg("Follow me !")
            } else if (result.data.follow_status == "yes") {
                setBtnColor("bg-green-500");
                setBtnMessg("🤍 for the follow !")
            }
        }
        catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            {/*Montrer-Cacher le bouton follow si connecté */}
            {follower && <button
                 onClick={() => handleClick(followed, follower)}
                 className={`mt-2 px-4 py-2 ${btnColor} text-white rounded-lg xter-common-button`}
            >
                {btnMessg} 
            </button>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    )
}

export default FollowBtn;