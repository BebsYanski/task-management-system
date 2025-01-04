import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <h1>Task Manager</h1>
    <Link to="/">Home</Link>
    <Link to="/add-task">Add Task</Link>
  </nav>
);

export default Navbar;
