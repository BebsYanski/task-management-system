// TaskForm.js (continued)
import React, { useState, useEffect } from "react";

const TaskForm = ({ taskToEdit, onSave, onClose }) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [priority, setPriority] = useState(taskToEdit?.priority || "Low");
  const [dueDate, setDueDate] = useState(taskToEdit?.due_date || "");
  const [status, setStatus] = useState(taskToEdit?.status || "incomplete");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.due_date);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Low");
      setDueDate("");
      setStatus("incomplete");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      priority,
      due_date: dueDate,
      status,
    };
    onSave(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="priority" className="form-label">
          Priority
        </label>
        <select
          className="form-select"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          className="form-control"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="incomplete">Incompleted</option>
          <option value="inProgress">In Progress</option>
          <option value="complete">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary me-2">
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
