import React, { useState, useEffect } from "react";
import { fetchTasks, deleteTask, updateTask, createTask } from "../api/api"; // Import createTask
import TaskForm from "./TaskForm";
import Pagination from "./Pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("creation_date");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const loadTasks = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false); // Set loading to false after fetching (success or failure)
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = async (taskData) => {
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, taskData);
      } else {
        await createTask(taskData); // Call create task API here
      }
      loadTasks();
      setShowModal(false);
      setTaskToEdit(null);
    } catch (err) {
      setError(err.message || "Failed to save task.");
      console.error("Error saving task:", err);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError(err.message || "Failed to delete task.");
      console.error("Error deleting task:", err);
    }
  };

  const handleAdd = () => {
    setTaskToEdit(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
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

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
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
        {showModal && taskToEdit
          ? "Cancel Edit"
          : showModal
          ? "Cancel Add"
          : "Add New Task"}
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{taskToEdit ? "Edit Task" : "Add New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            taskToEdit={taskToEdit}
            onSave={handleSave}
            onClose={handleCloseModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="list-group">
        {currentTasks.map((task) => (
          <div key={task.id} className="list-group-item mb-2 p-3">
            <h5 className="mb-2">{task.title}</h5>
            <p className="mb-1">{task.description}</p>
            <p className="mb-1">
              <strong>Priority:</strong> {task.priority} | <strong>Due:</strong>{" "}
              {task.due_date}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {task.status}
            </p>
            <div className="d-flex">
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
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Pagination
          totalItems={filteredTasks.length}
          itemsPerPage={tasksPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TaskList;
