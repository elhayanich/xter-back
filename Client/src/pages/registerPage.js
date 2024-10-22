import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
    // State to hold form values
    const [formData, setFormData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    });

    // State to handle form submission response (like errors or success)
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if(!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required!');
            return;
        }

        if(formData.password !== formData.confirmPassword) {
            setError('Passwords must match');
            return;
        }

        // Basic client-side validation
        const { username, email, password, confirmPassword } = formData;

        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Invalid email format');
          return;
        }

        // Password strength validation (at least 8 characters, one letter, one number)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
          setError('Password must be at least 8 characters long and contain at least one letter and one number');
          return;
        }

        console.log("data being sent:", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        try {
        // POST request to your FastAPI backend
          const response = await axios.post("http://127.0.0.1:8000/register", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

          setSuccess('Registration successful!');
          setError('');
          console.log(response.data);
        }
        catch (error) {
          setError('There was an error submitting the form');
          console.error(error);
        }

    };
    return (
        <div>
          <h2>Register</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
    
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">Mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword? 'text': 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
                <label htmlFor="password">Confirm password:</label>
                <input
                    type={showPassword? 'text': 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                
            </div>
            <button type="submit">Register</button>
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword? 'Hide password': 'Show password'}
            </button>
          </form>
        </div>
      );
}
    
export default RegistrationPage;
