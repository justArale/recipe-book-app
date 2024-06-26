import List from "../components/List";
import { Link } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/Skeleton.css";

const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const getAllRecipes = () => {
    axios
      .get(`${API_URL}/api/recipes`)
      .then((response) => {
        setAllRecipes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="grid-container">
      {errorMessage && <p>{errorMessage}</p>}
      {allRecipes &&
        allRecipes.map((recipe, index) =>
          isLoading ? (
            <div className="skeleton skeletonRecipes" key={recipe._id}></div>
          ) : (
            <div key={recipe.Id} className="findTheChild">
              {index % 2 === 0 && <div className="grid-row" />}
              <div className="grid-item">
                <Link to={`/recipes/${recipe.Id}`} className="listItem-link">
                  <List recipe={recipe} className="listItem-container" />
                </Link>
              </div>
              {index % 2 === 1 || index === recipes.length - 1 ? (
                <div className="grid-row" />
              ) : null}
            </div>
          )
        )}
    </div>
  );
}

export default DashboardPage;
