import axios from "axios";
import { useState, useEffect } from "react";

// La route doit être au format "/maRoute"
const useSendAuthoredMessage = ({ messageToSend, route }) => {
    const [responseData, setResponseData] = useState(null);
    
    useEffect(() => {          
        const sendMessage = async () => {
            if (messageToSend && route && route.startsWith("/")) {
                try{
                    const responseMessage = await axios.get(
                        'http://127.0.0.1:3310'.concat(route), 
                        {"message" : messageToSend},
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            },
                        }
                    );

                    if (responseMessage.data) {
                        setResponseData(responseMessage.data);
                    }
                } catch (error) {
                    console.error("Error fetching protected data:", error);
                }
            };
        sendMessage();
        }

    }, [messageToSend, route]);

    return { responseData };
};

export default useSendAuthoredMessage;



/*
import axios from "axios";
import React, { useState, useEffect } from "react";

// La route doit être au format "/maRoute"
const SendAuthoredMessage = ({ messageToSend, route }) => {
    const [status, setStatus] = useState("idle");
    
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                setStatus("getToken");

                console.log(messageToSend, route);

                const response = await axios.get("http://127.0.0.1:3310/token", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials: true
                });
                setStatus("sending");
                
                console.log("Authentication response: ", response);

                const sendMessage = async () => {
                    const sendAuthedMessage = await axios.post(
                        'http://127.0.0.1:3310'.concat(route), 
                        {"message" : messageToSend},
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            },
                            withCredentials: true
                        }
                    )

                    console.log("Message sent:", sendAuthedMessage.data);

                    setStatus("sent");
                };
                await sendMessage();

            } catch (error) {
                console.error("Error fetching protected data:", error);
                setStatus("error");
            }
        };

        if (messageToSend && route) {
            fetchAuth();
        }

    }, [messageToSend, route]);

    return (
        <div>
            {status === "idle" && <p>Prêt à envoyer le message</p>}
            {status === "getToken" && <p>Authentification réussie</p>}
            {status === "sending" && <p>Envoi en cours...</p>}
            {status === "sent" && <p>Message envoyé avec succès !</p>}
            {status === "error" && <p>Erreur lors de l'envoi du message</p>}
        </div>
    );
};

export default SendAuthoredMessage;
*/
