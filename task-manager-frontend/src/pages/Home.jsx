import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome to Task Manager</h1>
      <p>Manage your tasks efficiently and effectively.</p>
      <Link to="/tasks" className="btn btn-primary">
        View Tasks
      </Link>
    </div>
  );
};

export default Home;
