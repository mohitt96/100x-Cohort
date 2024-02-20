import { useEffect, useState, useCallback } from 'react';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      const {todos} = await response.json();
      if(todos && todos.length > 0) {
        setTodos(todos);
      }
    } catch(err) {
      console.log('Failed to fetch todos');
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <CreateTodo getTodos={getTodos} />
      <Todos todos={todos} getTodos={getTodos} />
    </div>
  )
}

export default App
