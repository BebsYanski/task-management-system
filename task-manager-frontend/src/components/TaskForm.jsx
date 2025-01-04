import React, { useState, useEffect } from "react";

import { createTask, updateTask } from "../api/api";

const TaskForm = ({ taskToEdit, onSave, onClose }) => {
  const [task, setTask] = useState({
    title: "",

    description: "",

    due_date: "",

    priority: "Low",

    status: "Incomplete",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskToEdit) {
      await updateTask(task.id, task);
    } else {
      await createTask(task);
    }

    onSave();
  };

  return (
    <div className="card">
      <div className="card-header">
        {taskToEdit ? "Edit Task" : "Create New Task"}
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="due_date" className="form-label">
              Due Date
            </label>

            <input
              type="date"
              className="form-control"
              id="due_date"
              name="due_date"
              value={task.due_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>

            <select
              className="form-select"
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>

            <select
              className="form-select"
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
