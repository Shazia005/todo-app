import Background from './components/Background';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Uses environment variable in production, falls back to local server if undefined
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';
function App() {
  
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
fetchTodos(); 
 }, []);

const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not connect to backend server');
    }
  };

  // 4. ADD TODO (POST)
  const addTodo = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('Failed to add task');

      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      toast.success('Task added successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add task');
    }
  };

  // 5. UPDATE TODO TEXT (PUT)
  const updateTodo = async (id, newText) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });

      if (!response.ok) throw new Error('Failed to update task');

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task');
    }
  };

  // 6. TOGGLE COMPLETION STATUS (PUT)
  const toggleComplete = async (id) => {
    const todoToToggle = todos.find((t) => t.id === id);
    if (!todoToToggle) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todoToToggle.completed }),
      });

      if (!response.ok) throw new Error('Failed to update task status');

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      if (updatedTodo.completed) {
        toast.success('Task marked as completed!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task status');
    }
  };

  // 7. DELETE TODO (DELETE)
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.error('Task deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete task');
    }
  };
 

const filteredTodos = todos.filter((todo) =>{
  if (filter === 'completed') return todo.completed;
  if (filter === 'incomplete') return !todo.completed;
  return true;
})
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Background />
      <main className="relative z-10 max-w-[1512px] w-full flex flex-col justify-center mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Header />
          <TodoForm addTodo={addTodo} filter={filter} setFilter={setFilter} />
        </div>
        <TodoList todos={filteredTodos} deleteTodo = {deleteTodo} toggleComplete={toggleComplete} updateTodo={updateTodo} />
      </main>
    </>
  );
}

export default App;