// file-upload.service.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
});

const token = localStorage.getItem("authToken");

// Function to upload avatar
export const uploadAvatarImage = async (fileData) => {
  try {
    const res = await API.post("/api/upload-avatar", fileData, {
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
export const uploadRecipeImage = async (fileData) => {
  try {
    const res = await API.post("/api/upload-recipe-image", fileData, {
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

// Delete recipe image from cloudinary storage
export const deleteRecipeImage = async (oldImageId, recipeId) => {
  try {
    await API.delete(`/api/delete-recipe-image/${oldImageId}/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};

// Delete avatar image from cloudinary storage
export const deleteAvatarImage = async (oldImageId, userId) => {
  try {
    await API.delete(`/api/delete-avatar/${oldImageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};

export default {
  uploadAvatarImage,
  uploadRecipeImage,
  deleteRecipeImage,
  deleteAvatarImage,
};
