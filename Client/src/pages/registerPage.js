import React, { useState } from "react";

function Register() {
    // State to hold form values
    const [formData, setFormData] = useState({
        'username': '',
        'mail': '',
        'password': ''
    });

    // State to handle form submission response (like errors or success)
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
                value={formData.name}
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
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      );
    }
    
export default Register;
