import React from "react";
import DashboardPage from "./DashboardPage";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/AuthorRecipes.css";

const API_URL = import.meta.env.VITE_API_URL;

function AuthorRecipes() {
  const { authorId } = useParams();
  const [currentAuthor, setCurrentAuthor] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuthorData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/${authorId}`);
      setCurrentAuthor(response.data);
      console.log("Author: ", response.data);
    } catch (error) {
      console.error("Error fetching author data:", error);
      const errorDescription =
        error.response?.data?.message ||
        "An error occurred while fetching author data";
      setErrorMessage(errorDescription);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorData();
  }, []);

  return (
    <div className="authorRecipesPage">
      <h2 className="body">
        All recipe of: <span className="boldWeight">{currentAuthor.name}</span>
      </h2>
      <DashboardPage />
    </div>
  );
}

export default AuthorRecipes;
