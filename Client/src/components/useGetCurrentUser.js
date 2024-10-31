import axios from "axios";
import { useState, useEffect } from "react";

const useGetCurrentUser = () => {
    const [id, setId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [email, setEmail] = useState(null);
    const [dateInscription, setDateInscription] = useState(null);
    const [picture, setPicture] = useState(null);

    
    useEffect(() => {          
        const getInformations = async () => {
            console.log(localStorage.getItem("token"));
            try{
                const responseMessage = await axios.get(
                    'http://127.0.0.1:3310/user/current', 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        } 
                    }
                );
                if (responseMessage.data) {
                    console.log(responseMessage.data)
                    setId(responseMessage.data.id);
                    setUserName(responseMessage.data.username);
                    setIsAdmin(responseMessage.data.is_admin);
                    setEmail(responseMessage.data.email);
                    setDateInscription(responseMessage.data.date_inscription);
                    setPicture(responseMessage.data.picture);
                }
            } catch (error) {
                console.error("Error fetching protected data:", error);
            }
        };
        
        getInformations();
    }, []);

    return { id, userName, isAdmin, email, dateInscription, picture };
};

export default useGetCurrentUser;