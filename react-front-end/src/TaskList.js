import React from 'react';
import Task from './Task';

function TaskList({ tasks, onDeleteTask }) {

const sortedTasks = tasks.slice().sort((a, b) => b.id - a.id);
  return (
    <ul>
      {sortedTasks.map((task) => (
        <Task
         key={task.id}
         task={task}
         onDeleteTask={onDeleteTask}
         statusColor={getTaskStatusColor(task.status)}
         />
      ))}
    </ul>
  );
}

function getTaskStatusColor(status) {
  switch (status) {
    case 'To Do':
      return '#f0f0f0';
    case 'In Progress':
      return '#fffacd';
    case 'Done':
      return '#d9ead3';
    default:
      return '#fff';
  }
}

export default TaskList;