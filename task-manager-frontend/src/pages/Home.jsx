import React from "react";
import { Link } from "react-router-dom";
import taskImage from "../assets/task-image.jpg"; // Replace with your image path

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <h1>Welcome to Task Manager</h1>
          <p>Manage your tasks efficiently and effectively.</p>
          <p className="mb-4">
            Stay organized and keep track of your progress.
          </p>
          <Link to="/tasks" className="btn btn-primary">
            Go to Task List
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src={taskImage}
            alt="Task Management Illustration"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
