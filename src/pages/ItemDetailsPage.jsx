import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../components/ListItem.css";
import { AuthContext } from "../context/auth.context";
import { IndexContext } from "../context/index.context";
import placeholderImage from "../assets/placeholder.svg";
import defaultAvatar from "../assets/defaultAvatar.svg";
import { Edit } from "@just1arale/icons";
import { Delete } from "@just1arale/icons";
import { getSingleRecipe, deleteRecipe } from "../service/api/recipe.service";

function ItemDetailsPage() {
  const { user } = useContext(AuthContext);
  const { authorId, recipeId } = useParams();

  const { isLoggedIn } = useContext(AuthContext);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { indexNumber } = useContext(IndexContext);

  const navigate = useNavigate();

  useEffect(() => {
    getSingleRecipe(authorId, recipeId).then((recipeData) => {
      setCurrentRecipe(recipeData);
      setIsLoading(false);
    });
  }, [recipeId, user]);

  const handleDeleteRecipe = (authorId, recipeId) => {
    deleteRecipe(authorId, recipeId).then(() => {
      navigate(`/`);
    });
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
          {isLoggedIn && user._id === currentRecipe.author._id && (
            <div className="action">
              <Link
                to={`/user/${authorId}/recipes/edit/${recipeId}`}
                className="buttonFont noUnderline primaryColor"
                state={{ currentRecipe }}
              >
                <button>
                  <div className="buttonContentWrapper">
                    <div className="iconWrapper">
                      <Edit width="16" height="16" alt="Edit Icon" />
                    </div>
                    <span className="buttonFont">Edit</span>
                  </div>
                </button>
              </Link>

              <button
                onClick={handleDeleteModel}
                className="buttonFont noUnderline primaryColor"
              >
                <div className="buttonContentWrapper">
                  <div className="iconWrapper">
                    <Delete width="16" height="16" alt="Delete Icon" />
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
                onClick={() => handleDeleteRecipe(authorId, currentRecipe._id)}
              >
                <div className="buttonContentWrapper">
                  <div className="iconWrapper">
                    <Delete width="16" height="16" alt="Delete Icon" />
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
