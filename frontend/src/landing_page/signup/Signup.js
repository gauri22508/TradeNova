import React, { useState } from 'react';


function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('Creating account...');

        try {
            const response = await fetch('http://localhost:3002/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            setMessage(result.message || 'Account created');
        } catch (error) {
            setMessage('Connection failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Create account</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default Signup;
