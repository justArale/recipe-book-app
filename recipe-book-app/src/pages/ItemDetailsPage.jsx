import { NavLink, useParams } from "react-router-dom";
import recipesData from "../components/recipes.json";
import ListItem from "../components/ListItem";
import { useState, useEffect } from "react";
import "../components/ListItem.css";
/////
import EditPage from "./EditPage";

function ItemDetailsPage() {
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState(recipesData);

  const recipeProfile = recipesData.find((recipe) => recipe.Id === recipeId);

  const deleteRecipe = (recipeId) => {
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.Id !== recipeId;
    });
    setRecipes(filteredRecipes);
  };

  return (
    <article>
      {/* <ListItem recipe={recipeProfile} /> */}
      {recipeProfile && (
        <div className="itemDetail-page">
          <div className="recipe-main">
            <div className="content">
              <h1 className="content-title">{recipeProfile.Name}</h1>
              <p className="content-description">{recipeProfile.Description}</p>
            </div>
            <img src={recipeProfile.img} />
          </div>
          {recipeProfile.Ingredients && (
            <div className="detailPage-ingredients">
              <strong className="ingredient-header">Ingredients:</strong>
              <ul>
                {recipeProfile.Ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="ingredient-amount">
                      {ingredient.amount}
                    </span>
                    <span className="ingredient-name">{ingredient.name}</span>
                  </li>
                ))}
              </ul>
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
            <NavLink to="/" className="selected">
              <button> ↩️ Back</button>
            </NavLink>
            <NavLink to={`/editrecipe/${recipeId}`} className="selected">
              <button>✏️ Edit</button>
              {/* <EditPage recipeId={recipeId} /> */}
            </NavLink>
            <NavLink to="/" className="selected">
              <button
                onClick={() => deleteRecipe(recipeProfile.Id)}
                className="btn-delete"
              >
                🗑️ Delete
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </article>
  );
}
/////////
export default ItemDetailsPage;
