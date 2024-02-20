/* eslint-disable react/prop-types */
import { useState } from "react";

export function CreateTodo({getTodos}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function addTodoHandler() {
        try {
            const response = await fetch('http://localhost:3000/todo', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    description: description,
                }),
                headers: {
                    'content-type': 'application/json'
                },
            });
            await response.json();
            if(response.status === 200) {
                getTodos();
            }
        } catch (err) {
            console.log('Failed to add todo');
        }
    }

    return (
        <div>
            <input style={{padding: 10,margin: 10}} type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}></input><br></br>
            <input style={{padding: 10,margin: 10}} type="text" placeholder="description" onChange={(e) => {setDescription(e.target.value)}}></input><br></br>
            <button style={{padding: 10,margin: 10}} onClick={addTodoHandler}>Add Todo</button>
        </div>
    )
}