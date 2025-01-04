import React, { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "../api/api";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false); // This is KEY
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("creation_date");

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = () => {
    loadTasks();
    setFormVisible(false); // Hide the form after saving
    setTaskToEdit(null);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setFormVisible(true); // Show the form for editing
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleAdd = () => {
    setTaskToEdit(null);
    setFormVisible(!isFormVisible); // Toggle form visibility!
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "priority") {
        return a.priority.localeCompare(b.priority);
      } else if (sortOption === "due_date") {
        return new Date(a.due_date) - new Date(b.due_date);
      } else {
        return new Date(a.creation_date) - new Date(b.creation_date);
      }
    });

  return (
    <div>
      <h1>Tasks</h1>
      <div className="d-flex justify-content-between my-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select className="form-select w-25" onChange={handleSortChange}>
          <option value="creation_date">Sort by Creation Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="due_date">Sort by Due Date</option>
        </select>
      </div>
      <button className="btn btn-success mb-3" onClick={handleAdd}>
        {isFormVisible ? "Cancel Add" : "Add New Task"} {/*Improved UX*/}
      </button>
      {isFormVisible && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSave={handleSave}
          onClose={() => setFormVisible(false)} //This is important to close the form from within the form.
        />
      )}
      <div className="list-group">
        {filteredTasks.map((task) => (
          <div key={task.id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <p>
              <strong>Priority:</strong> {task.priority} | <strong>Due:</strong>{" "}
              {task.due_date}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <button
              className="btn btn-primary me-2"
              onClick={() => handleEdit(task)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
