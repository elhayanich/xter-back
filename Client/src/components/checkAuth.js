import axios from "axios";
import React, { useState, useEffect } from "react";

const CheckAuth = () => {
    const [status, setStatus] = useState("idle");
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3310/token", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });

                if (response) {
                    setStatus("yes");
                    setUserId(response.data.user);
                }
                else {
                    setStatus("no");
                }

            } catch (error) {
                console.error("Error fetching protected data:", error);
            }
        };

        fetchAuth();
    }, []);

    return (
        <div>
            {status === "idle" && <p>Prêt à vérifier l'authentification</p>}
            {status === "yes" && <p>Authentification réussie. Bienvenue {userId}</p>}
            {status === "no" && <p>Authentification échouée</p>}
        </div>
    )
};

export default CheckAuth;
