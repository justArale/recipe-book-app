import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../components/ListItem.css";
import placeholderImage from "../assets/placeholder.svg";
import { AuthContext } from "../context/auth.context";
import { IndexContext } from "../context/index.context";
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
  const { indexNumber } = useContext(IndexContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Jump to the top
    window.scrollTo(0, 0);
  }, []);

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
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting project:", error);
      setErrorMessage("An error occurred while deleting the project.");
    }
  };

  const getClassNameByIndex = (index) => {
    const classNames = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
    ];
    return classNames[index % classNames.length];
  };

  return (
    <div>
      {isLoading ? (
        <div className="itemDetail-page">
          <div className="recipe-main">
            <div className="skeleton skeletonDetailRecipesMain"></div>
          </div>
          <div className="detailPage-ingredients">
            <h3 className="bodyLarge">Ingredients:</h3>

            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="detailPage-instruction">
            <h3 className="bodyLarge">Instruction:</h3>

            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className="itemDetail-page">
          <div className={`recipe-main ${getClassNameByIndex(indexNumber)}`}>
            <div className="content">
              <h1 className="pageTitle">{currentRecipe.name}</h1>
              <p className="body">{currentRecipe.description}</p>
              <p className="body" style={{ marginTop: "auto" }}>
                added by:{" "}
                <Link to={`/user/${authorId}/recipes`} className="noUnderline">
                  <span className="boldWeight primaryColor">
                    {currentRecipe.author.name}
                  </span>
                </Link>
              </p>
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
          {isLoggedIn && currentUser._id === currentRecipe.author._id && (
            <div className="action">
              <button>
                <a
                  href={`/user/${authorId}/recipes/edit/${recipeId}`}
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
