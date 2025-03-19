import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from Local Storage when the app starts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to Local Storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (title, description) => {
    const newTask = { id: Date.now(), title, description, status: "To Do" };
    setTasks([...tasks, newTask]);
  };

  // Update task
  const updateTask = (id, updatedTitle, updatedDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: updatedTitle, description: updatedDescription }
        : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Move task between columns
  const updateTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, updateTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
