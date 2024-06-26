import { useParams, useNavigate } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect, useContext } from "react";
import "../components/ListItem.css";
import placeholderImage from "../assets/placeholder.svg";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ItemDetailsPage() {
  const { user } = useContext(AuthContext);
  const { authorId, recipeId } = useParams();

  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || recipesData
  );

  useEffect(() => {
    // Jump to the top
    window.scrollTo(0, 0);
  }, []);

  // // Search for recipe in localStorage
  // const recipeProfile = recipes.find((recipe) => recipe.Id === recipeId);

  const fetchUserData = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (!user || !user._id) {
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/api/user/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setCurrentUser(response.data);
      console.log("User: ", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      const errorDescription =
        error.response?.data?.message ||
        "An error occurred while fetching user data";
      setErrorMessage(errorDescription);
      setIsLoading(false);
    }
  };

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/user/${authorId}/recipes/${recipeId}`
      );
      setCurrentRecipe(response.data);
      console.log("Recipe: ", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
      const errorDescription =
        error.response?.data?.message ||
        "An error occurred while fetching recipe data";
      setErrorMessage(errorDescription);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchUserData();
      }
      await fetchRecipeData();
    };

    fetchData();
  }, [recipeId, user]);

  // const deleteRecipe = (recipeId) => {
  //   const filteredRecipes = recipes.filter((recipe) => recipe.Id !== recipeId);
  //   setRecipes(filteredRecipes);
  //   localStorage.setItem("recipes", JSON.stringify(filteredRecipes));
  //   navigate("/");
  //   window.scrollTo(0, 0);
  // };

  const deleteRecipe = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.delete(
        `${API_URL}/api/user/${authorId}/recipes/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log("Deleted:", response.data);
      // notifyDelete();
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Error deleting project:", error);
      setErrorMessage("An error occurred while deleting the project.");
    }
  };

  return (
    <div className="itemDetail-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div>
          <div className="recipe-main">
            <div className="content">
              <h1 className="pageTitle">{currentRecipe.name}</h1>
              <p className="body">{currentRecipe.description}</p>
            </div>

            <img
              src={currentRecipe.image ? currentRecipe.image : placeholderImage}
              alt={currentRecipe.name}
              className={`${currentRecipe.image ? "" : ""}`}
            />
          </div>
          {currentRecipe.ingredients && (
            <div className="detailPage-ingredients">
              <h3 className="bodyLarge">Ingredients:</h3>
              <div className="ingredient-list">
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="body boldWeight thirdColor">
                      {ingredient.amount}
                    </span>
                    <span className="body">{ingredient.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="detailPage-instruction">
            <h3 className="bodyLarge">Instruction:</h3>
            <div className="instuction-list">
              {currentRecipe.instruction.map((instruction, index) => (
                <div key={index} className="body instuction-item">
                  {instruction}
                </div>
              ))}
            </div>
          </div>
          {isLoggedIn && (
            <div className="action">
              {/* <button>
          <a href="/" className="body noUnderline primaryColor boldWeight">
            ↩️ Back
          </a>
        </button> */}

              <button>
                <a
                  href={`/recipes/edit/${recipeId}`}
                  className="body noUnderline primaryColor boldWeight"
                >
                  ✏️ Edit
                </a>
              </button>

              <button
                onClick={() => deleteRecipe(currentRecipe._id)}
                className="body noUnderline primaryColor boldWeight"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemDetailsPage;
