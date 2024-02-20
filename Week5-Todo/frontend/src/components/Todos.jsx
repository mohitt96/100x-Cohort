/* eslint-disable react/prop-types */

export function Todos({todos, getTodos}) {
    async function markCompleteHandler(todoId) {
        try {
            const response = await fetch('http://localhost:3000/completed', {
                method: 'PUT',
                body: JSON.stringify({
                    id: todoId,
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
            console.log('Failed to mark todo as completed');
        }
    }

    return (
        <>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => {markCompleteHandler(todo._id)}}>{todo.completed === true ? "Completed" : "Mark as Complete"}</button>
                </div>
            ))}
        </>
    )
}