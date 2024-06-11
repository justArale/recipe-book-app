import { useParams, useNavigate } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";
import "../components/ListItem.css";

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
  };

  return (
    <article>
      {recipeProfile && (
        <div className="itemDetail-page">
          <div className="recipe-main">
            <div className="content">
              <h1 className="content-title">{recipeProfile.Name}</h1>
              <p className="content-description">{recipeProfile.Description}</p>
            </div>
            <img src={recipeProfile.img} alt={recipeProfile.Name} />
          </div>
          {recipeProfile.Ingredients && (
            <div className="detailPage-ingredients">
              <strong className="ingredient-header">Ingredients:</strong>
              <div className="ingredient-list">
                {recipeProfile.Ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-amount">
                      {ingredient.amount}
                    </span>
                    <span className="ingredient-name">{ingredient.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="detailPage-instruction">
            <strong className="instruction-header">Instruction:</strong>
            <div className="instuction-list">
              {recipeProfile.Instruction.map((instruction, index) => (
                <div key={index} className="instuction-item">
                  {instruction}
                </div>
              ))}
            </div>
          </div>
          <div className="action">
            <button>
              <a href="/">↩️ Back</a>
            </button>
            <button>
              <a href={`/editrecipe/${recipeId}`}>✏️ Edit</a>
            </button>
            <button
              onClick={() => deleteRecipe(recipeProfile.Id)}
              className="btn-delete"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default ItemDetailsPage;
