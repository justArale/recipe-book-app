import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
});
const token = localStorage.getItem("authToken");

export const getAllUsers = async () => {
  try {
    const response = await API.get(`api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSingleUser = async (userId) => {
  try {
    const response = await API.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteUser = async (userId) => {
  try {
    await API.delete(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export default {
  getAllUsers,
  getSingleUser,
  deleteUser,
};
