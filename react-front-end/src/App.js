import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';

const BASE_URL = 'http://localhost:8000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(BASE_URL + '?page=1&per_page=10');
    setTasks(response.data.data);
  };

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`${BASE_URL}/${taskId}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={fetchTasks} baseUrl={BASE_URL} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;