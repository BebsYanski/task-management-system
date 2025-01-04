import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/add-task" element={<TaskForm />} />
    </Routes>
  </Router>
);

export default App;
