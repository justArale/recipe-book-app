import { useParams, useNavigate } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";
import "../components/ListItem.css";
import placeholderImage from "../assets/placeholder.svg";

function ItemDetailsPage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || recipesData
  );

  useEffect(() => {
    // Jump to the top
    window.scrollTo(0, 0);
  }, []);

  // Search for recipe in localStorage
  const recipeProfile = recipes.find((recipe) => recipe.Id === recipeId);

  const deleteRecipe = (recipeId) => {
    const filteredRecipes = recipes.filter((recipe) => recipe.Id !== recipeId);
    setRecipes(filteredRecipes);
    localStorage.setItem("recipes", JSON.stringify(filteredRecipes));
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="itemDetail-page">
      <div className="recipe-main">
        <div className="content">
          <h1 className="pageTitle">{recipeProfile.Name}</h1>
          <p className="body">{recipeProfile.Description}</p>
        </div>

        <img
          src={recipeProfile.img ? recipeProfile.img : placeholderImage}
          alt={recipeProfile.Name}
          className={`${recipeProfile.img ? "" : ""}`}
        />
      </div>
      {recipeProfile.Ingredients && (
        <div className="detailPage-ingredients">
          <h3 className="bodyLarge">Ingredients:</h3>
          <div className="ingredient-list">
            {recipeProfile.Ingredients.map((ingredient, index) => (
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
          {recipeProfile.Instruction.map((instruction, index) => (
            <div key={index} className="body instuction-item">
              {instruction}
            </div>
          ))}
        </div>
      </div>
      <div className="action">
        {/* <button>
          <a href="/" className="body noUnderline primaryColor boldWeight">
            ↩️ Back
          </a>
        </button> */}
        <button>
          <a
            href={`/editrecipe/${recipeId}`}
            className="body noUnderline primaryColor boldWeight"
          >
            ✏️ Edit
          </a>
        </button>
        <button
          onClick={() => deleteRecipe(recipeProfile.Id)}
          className="body noUnderline primaryColor boldWeight"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
