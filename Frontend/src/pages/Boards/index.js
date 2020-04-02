import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import createBtn from '../../assets/correct.svg'

import './styles.css';

export default function Boards({ history }) {
    const [boards, setBoards] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        async function loadBoards() {
            const response = await api.get('/boards');

            setBoards(response.data)
        }

        loadBoards();
    }, [boards]);


    async function handleSubmit(event) {
        event.preventDefault();

        await api.post('/boards', { name });

        setName('');
    }

    async function deleteBoard(board_id) {
        await api.delete('/boards',{
            headers: { board_id }
        });

    }

    return (
    <>        
        <h1>All Boards</h1>
        <ul className="board-list">
            {boards.map(board => (
                <li key={board._id}>
                    <button className="delBtn" onClick={() => deleteBoard(board._id)} >x</button>
                    <Link to={`/boards/${board._id}`}><header>{board.name}</header></Link> 
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