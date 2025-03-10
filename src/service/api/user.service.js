import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
});

// Set token each time
const token = localStorage.getItem("authToken");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getAllUsers = async () => {
  try {
    const response = await API.get(`api/user`);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSingleUser = async (userId) => {
  try {
    const response = await API.get(`/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUser = async (userId, values) => {
  try {
    await API.put(`/api/user/${userId}`, values);
  } catch (error) {
    console.error(error);
  }
};

export const changeUserPassword = async (userId, oldPassword, newPassword) => {
  try {
    await API.put(`/api/user/${userId}/change-password`, {
      oldPassword,
      newPassword,
    });
  } catch (error) {
    console.error("Error changing password:", error);
  }
};

export const deleteUser = async (userId) => {
  try {
    await API.delete(`/api/user/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export default {
  getAllUsers,
  getSingleUser,
  updateUser,
  changeUserPassword,
  deleteUser,
};
