import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskForm.css';


function TaskForm({ onTaskAdded, baseUrl }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    if (!description.trim()) {
      errors.description = 'Description is required';
    }
    if (!dueDate) {
      errors.dueDate = 'Due Date is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formattedDueDate = dueDate ? dueDate.toISOString().split('T')[0] : null;
    const newTask = { title, description, due_date: formattedDueDate };
    console.log('New Task:', newTask);

    await axios.post(baseUrl, newTask);
    setTitle('');
    setDescription('');
    setDueDate(null);
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {formErrors.title && <span className="error">{formErrors.title}</span>}
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {formErrors.description && <span className="error">{formErrors.description}</span>}
      </label>
      <label>
        Due Date:
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="MM/dd/yyyy"
          isClearable
          required
        />
        {formErrors.dueDate && <span className="error">{formErrors.dueDate}</span>}
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
