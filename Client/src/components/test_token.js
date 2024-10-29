import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestonsLeToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <div>TU N4ES PAS CONNECT2§§§§</div>;
    } else {
        return <div>Tu es connecté</div>;
    }
};

export default TestonsLeToken;