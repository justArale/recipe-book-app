import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../components/ListItem.css";
import placeholderImage from "../assets/placeholder.svg";
import defaultAvatar from "../assets/defaultAvatar.svg";
import { AuthContext } from "../context/auth.context";
import { IndexContext } from "../context/index.context";
import axios from "axios";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

const API_URL = import.meta.env.VITE_API_URL;

function ItemDetailsPage() {
  const { user } = useContext(AuthContext);
  const { authorId, recipeId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
      // notifyDelete();
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setErrorMessage("An error occurred while deleting the recipe.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
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
    return classNames[(index - 1) % classNames.length];
  };

  const handleDeleteModel = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="itemDetailPageWrapper">
      {isLoading ? (
        <div className="itemDetail-page">
          <div className="skeleton skeletonDetailRecipesMain"></div>

          <div className="detailPage-ingredients">
            <h3 className="headline">Ingredients:</h3>

            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="detailPage-instruction">
            <h3 className="headline">Instruction:</h3>

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
          <div className="recipeHeadWrapper">
            <div
              className={`recipeHeaderContent ${getClassNameByIndex(
                indexNumber
              )}`}
            >
              <h1 className="pageTitle">{currentRecipe.name}</h1>
              <p className="mainFont">{currentRecipe.description}</p>
            </div>

            <div className="recipeImageWrapper">
              <img
                src={
                  currentRecipe.image ? currentRecipe.image : placeholderImage
                }
                alt={currentRecipe.name}
                className={`${currentRecipe.image ? "recipeImage" : ""}`}
              />
            </div>
          </div>
          <div className="metaDetailWrapper">
            <Link
              to={`/user/${authorId}`}
              className="noUnderline authorInfoWrapper"
            >
              <div className="authorImageSmallWrapper">
                <img
                  src={currentRecipe.author.image || defaultAvatar}
                  className="authorImageSmall"
                />
              </div>

              <div className="ownerInfoSmall">
                <p className="mainFont primaryColor">
                  By {currentRecipe.author.name}
                </p>
                <p className="meta thirdColor">
                  On {formatDate(currentRecipe.author.createdAt)}
                </p>
              </div>
            </Link>
          </div>
          {currentRecipe.ingredients && (
            <div className="detailPage-ingredients">
              <h3 className="headline">Ingredients:</h3>
              <div className="ingredient-list">
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <p className="mainFont mainFontFamily semiBoldWeigth">
                      {ingredient.amount}
                    </p>
                    <p className="ingredientGap"></p>
                    <p className="mainFont">{ingredient.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="detailPage-instruction">
            <h3 className="headline">Instruction:</h3>
            <div className="instuction-list">
              {currentRecipe.instruction.map((instruction, index) => (
                <div key={index} className="mainFont instuction-item">
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
                  className="buttonFont noUnderline primaryColor"
                >
                  <div className="buttonContentWrapper">
                    <div className="iconWrapper">
                      <img src={editIcon} alt="Icon" />
                    </div>
                    <span className="buttonFont">Edit</span>
                  </div>
                </a>
              </button>

              <button
                onClick={handleDeleteModel}
                className="buttonFont noUnderline primaryColor"
              >
                <div className="buttonContentWrapper">
                  <div className="iconWrapper">
                    <img src={deleteIcon} alt="Icon" />
                  </div>
                  <span className="buttonFont">Delete</span>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="overlay-content">
            <div className="deleteModalContent">
              <h3 className="headline">Delete Recipe</h3>
              <p className="mainFont">Are you sure to delete your recipe?</p>
              <button
                className="button buttonAware primaryColor"
                onClick={() => deleteRecipe(currentRecipe._id)}
              >
                <div className="buttonContentWrapper">
                  <div className="iconWrapper">
                    <img src={deleteIcon} alt="Icon" />
                  </div>
                  <span className="buttonFont">Delete</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetailsPage;
