// file-upload.service.js

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
});

// Function to upload avatar
const uploadAvatar = async (fileData) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await api.post("/api/upload-avatar", fileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.fileUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to upload recipe-image
const uploadRecipeImage = async (fileData) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await api.post("/api/upload-recipe-image", fileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.fileUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  uploadAvatar,
  uploadRecipeImage,
};
