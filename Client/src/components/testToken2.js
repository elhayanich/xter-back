import axios from "axios";
import React, { useState, useEffect } from "react";

const TestonsEncoreLeToken = () => {
    const [uAre, setUAre] = useState("nothing");
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchUserRole = async () => {
            setToken(localStorage.getItem("token"));
            let token = localStorage.getItem("token")
            console.log("token : " + token);

            try {
                const response = await axios.get("http://127.0.0.1:3310/token", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials: true
                });

                console.log("we have an answer");
                if (response.data.role === "ADMIN") {
                    setUAre("ADMIN");
                } else {
                    setUAre("A CUSTOMER");
                }
            } catch (error) {
                console.error("Error fetching protected data:", error);
                setUAre("AN ERROR");
            }
        };

        fetchUserRole();
    }, []);

    return (
        <div>
            <h3>You are:</h3>
            <h1>{uAre}</h1>
            <h3>Your token is :</h3>
            <h1>{token}</h1>
        </div>
    );
};

export default TestonsEncoreLeToken;
