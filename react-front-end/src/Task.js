import React, { useState } from 'react';
import axios from 'axios';
import './Task.css';

function Task({ task, onDeleteTask, statusColor }) {
  const { id, title: initialTitle, description: initialDescription, status: initialStatus, due_date } = task;


  const formattedDueDate = new Date(due_date).toLocaleDateString();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus);

  const handleDelete = () => {
    onDeleteTask(id);
  };

  const BASE_URL = 'http://localhost:8000/api/tasks/';
  const handleSave = async () => {
    try {
      const updatedTask = {
        id: task.id,
        title: title,
        description: description,
        status: status,
        due_date: task.due_date,
      };

      const response = await axios.put(BASE_URL + task.id, updatedTask);
  
      console.log('Task updated successfully:', response.data);
  
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <li className="task" style={{ backgroundColor: statusColor }}>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
      <h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={handleSave} />
      </h2>
      <p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} onBlur={handleSave} />
      </p>
      <div>
        <strong>Status:</strong>
        <select value={status} onChange={(e) => setStatus(e.target.value)} onBlur={handleSave}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <strong>Due Date:</strong> {formattedDueDate}
      </div>
    </li>
  );
}

export default Task;