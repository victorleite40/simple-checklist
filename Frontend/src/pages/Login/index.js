import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(event) {
        event.preventDefault();
        
        const response = await api.post('/signin', {
            email: email,
            username: username,
            password: password
        });

        const { _id } = response.data;
  
        localStorage.setItem('user_id', _id);

        history.push('/boards'); 
    }

    return (
    <>
        <h1>Sign In</h1>
        <form className="signForm" onSubmit={handleSubmit}>
            <label htmlFor="email"></label>
            <input 
                type="email"
                id="email"
                placeholder="Email *"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <label htmlFor="username"></label>
            <input 
                id="username"
                placeholder="Username *"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />

            <label htmlFor="password"></label>
            <input 
                type="password"
                id="password"
                placeholder="Password *"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />

            <button type="submit" className="btnSign">Register</button>
        </form>
    </>
    )
}