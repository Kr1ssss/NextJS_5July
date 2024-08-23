import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState({});

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const handleToggleCompleted = (task) => {
    setCompletedTasks({ ...completedTasks, [task]: !completedTasks[task] });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={completedTasks[task]}
              onChange={() => handleToggleCompleted(task)}
            />
            <span
              style={{
                textDecoration: completedTasks[task] ? 'line-through' : 'none',
              }}
            >
              {task}
            </span>
            <button onClick={() => handleDeleteTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;