import axios from "axios";

const API_URL = "http://localhost:8000/tasks"; // Adjust to match your backend deployment

export const getTasks = async (query = "") => {
  const response = await axios.get(`${API_URL}${query}`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
