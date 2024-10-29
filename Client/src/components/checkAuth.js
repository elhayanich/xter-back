import axios from "axios";
import useEffect from "react";

const CheckAuth = () => {
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3310/token", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials: true
                });

            } catch (error) {
                console.error("Error fetching protected data:", error);
            }
        };

        fetchAuth();
    }, []);
};

export default CheckAuth;
