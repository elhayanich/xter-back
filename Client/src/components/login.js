import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Pour éviter de rafraichir la page lors de l'envoi du formulaire

        if (!formData.email || !formData.password) {
            setError('All fields are required!');
            return;
        }

        const {email, password } = formData;

        try {
            const response = await axios.post("http://127.0.0.1:3310/login", {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.data.error) {
                setError(response.data.error);
                setSuccess('');
            } else {
                // Réception du token

                if (response.data.token) {
                    // Stocker le token dans localStorage
                    localStorage.setItem("token", response.data.token);
                    setSuccess(`Login successful! Welcome ${response.data.username}!`);
                    setError(''); 

                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                } else {
                    setError("You have no rights to be here");
                }
            }
        } catch (error) {
            setSuccess('');

            if (error.response) {
                // Erreur serveur avec réponse
                setError(error.response.data.detail || "An error occurred.");
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                setError(error.request.detail || "No response from server. Please try again later.");
            } else {
                // Autre erreur (problème de configuration ou réseau)
                setError("An unexpected error occurred.");
            }
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Login</h2>

            {error && <p className="text-pink-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-pink-700 font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-pink-300 rounded focus:outline-none focus:border-pink-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-pink-700 font-bold mb-2">Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-pink-300 rounded focus:outline-none focus:border-pink-500"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-pink-500 hover:text-pink-700 transition"
                    >
                        {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
