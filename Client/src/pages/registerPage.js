import React, { useState } from "react";

const RegistrationPage = () => {
    // State to hold form values
    const [formData, setFormData] = useState({
        'username': '',
        'mail': '',
        'password': '',
        'confirmPassword': ''
    });

    // State to handle form submission response (like errors or success)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const handleSubmit = (e) => {
        // Validation
        if(!formData.username || !formData.mail || !formData.password) {
            setError('All fields are required!');
            return;
        }

        if(formData.password !== formData.confirmPassword) {
            setError('Passwords must match');
            return;
        }

        console.log('Form submitted', formData);
        setSuccess('Registration successful!');
        setError('');
    }


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
                type={showPassword? 'text': 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword? 'Hide': 'Show'}
              </button>
            </div>
            <div>
                <label htmlFor="password">Confirm password:</label>
                <input
                    type={showConfirmPassword? 'text': 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                
            </div>
            <button type="submit">Register</button>
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword? 'Hide': 'Show'}
                    </button>
          </form>
        </div>
      );
    }
    
export default RegistrationPage;
