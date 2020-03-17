import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import createBtn from '../../assets/correct.svg'

import './styles.css';

export default function Dashboard({ history }) {
    const [boards, setBoards] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        async function loadBoards() {
            const response = await api.get('/boards');

            setBoards(response.data)
        }

        loadBoards();
    }, []);


    async function handleSubmit(event) {
        event.preventDefault();

        await api.post('/boards', { name });

        window.location.reload(); 
    }

    return (
    <>
        <ul className="board-list">
            {boards.map(board => (
                <li key={board._id}>
                    <header>{board.name}</header>
                </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input 
                id="name"
                placeholder="Board Name"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <button type="submit" className="btn">Create</button>
        </form>
    </>
    )
}