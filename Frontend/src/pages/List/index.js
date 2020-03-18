import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function List({ history }) {

    const [items, setItems] = useState([]);
    const [boards, setBoards] = useState([]);
    const [task, setTask] = useState('');

    let { board_id } = useParams();
    
    useEffect(() => {
        async function loadBoard() {
            const response = await api.get('/boards');

            setBoards(response.data)
        }
        
        async function loadItems() {
            const response = await api.get('/boards/:board_id', {
                headers: { board_id }
            });

            setItems(response.data)
        }

        loadBoard();
        loadItems();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();        

        if (task) {
            await api.post('/boards/:board_id', { task }, { 
                headers: { board_id }
            });

            window.location.reload(); 
        }
    }

    async function handleDone(item_id) {
        await api.put('/boards/:board_id', {}, { 
            headers: { item_id }
        });

        window.location.reload(); 
    }

    async function deleteTask(item_id) {
        await api.delete('/boards/:board_id',{
            headers: { item_id }
        });
        window.location.reload(); 
    }

    return (
    <>
        <Link to="/boards">
            <button className="backBtn" type="submit">{`< All Boards`}</button>
        </Link>

        {/* {boards.map(board => <h1>{board.name}</h1>)} */}
        <ul className="item-list">
            {items.map(item => (
                <li key={item._id}>
                    <button className="delBtn" onClick={() => deleteTask(item._id)} >x</button>
                    <button className="doneBtn" onClick={() => handleDone(item._id)} style={item.done ? {background: "#7ed44c"} : {background: "#d44c4c"}}>{item.done ? `done` : `pending`}</button>
                    <header>{item.task}</header>
                </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
            <label htmlFor="task"></label>
            <input 
                id="task"
                placeholder="New task"
                value={task}
                onChange={event => setTask(event.target.value)}
            />
            <button type="submit" className="btn">Create</button>
        </form>
    </>
    )
}