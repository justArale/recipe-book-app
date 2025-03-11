import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
});

// Set token each time
const token = localStorage.getItem("authToken");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getAllRecipes = async () => {
  try {
    const response = await API.get(`api/recipes`);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllRecipesOfOneAuthor = async (authorId) => {
  try {
    const response = await API.get(`/api/user/${authorId}/recipes`);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSingleRecipe = async (authorId, recipeId) => {
  try {
    const response = await API.get(`/api/user/${authorId}/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createRecipe = async (userId, recipeData) => {
  try {
    await API.post(`/api/user/${userId}/recipes`, recipeData);
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = async (authorId, recipeId, recipeData) => {
  try {
    const response = await API.put(
      `/api/user/${authorId}/recipes/${recipeId}`,
      recipeData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteRecipe = async (authorId, recipeId) => {
  try {
    await API.delete(`/api/user/${authorId}/recipes/${recipeId}`);
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};

export default {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
