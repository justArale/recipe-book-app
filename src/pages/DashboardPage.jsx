import List from "../components/List";
import { Link, useParams } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../components/Skeleton.css";
import { IndexContext } from "../context/index.context";

const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const { authorId } = useParams();
  const [allRecipes, setAllRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { setIndexNumber } = useContext(IndexContext);

  const getAllRecipes = () => {
    axios
      .get(`${API_URL}/api/recipes`)
      .then((response) => {
        setAllRecipes(response.data);
        console.log("recipe.author._id", response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
        setIsLoading(false);
      });
  };

  const getAllRecipesOfOneAuthor = () => {
    axios
      .get(`${API_URL}/api/user/${authorId}/recipes`)
      .then((response) => {
        setAllRecipes(response.data);
        console.log("recipe._id", response.data);
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
    if (authorId) {
      getAllRecipesOfOneAuthor();
    } else {
      getAllRecipes();
    }
  }, []);

  const setIndex = (index) => {
    setIndexNumber(index); // Set index in the context
  };

  return (
    <div className="grid-container">
      {errorMessage && <p>{errorMessage}</p>}
      {allRecipes &&
        allRecipes.map((recipe, index) =>
          isLoading ? (
            <div className="skeleton skeletonRecipes" key={recipe._id}></div>
          ) : (
            <div key={recipe._id} className="findTheChild">
              {index % 2 === 0 && <div className="grid-row" />}
              <div className="grid-item" key={recipe._id}>
                <Link
                  to={`/user/${recipe.author._id}/recipes/${recipe._id}`}
                  className="listItem-link"
                  onClick={() => setIndex(index)}
                >
                  <List recipe={recipe} className="listItem-container" />
                </Link>
              </div>
              {index % 2 === 1 || index === recipe.length - 1 ? (
                <div className="grid-row" />
              ) : null}
            </div>
          )
        )}
    </div>
  );
}

export default DashboardPage;
