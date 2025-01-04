import React, { useState } from "react";
import { createTask } from "../api/api";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    due_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(formData);
    alert("Task created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <select name="priority" onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="date" name="due_date" onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
