import { NavLink, useParams } from "react-router-dom";
import recipesData from "../components/recipes.json";
import ListItem from "../components/ListItem";
import { useState, useEffect } from "react";
import "../components/ListItem.css";

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
        <div>
          <div className="recipe">
            <div className="content">
              <h1 className="content-title">{recipeProfile.Name}</h1>
              <p className="content-description">{recipeProfile.Description}</p>
            </div>
            <img src={recipeProfile.img} />
          </div>
          {recipeProfile.Ingredients && (
            <div>
              <strong>Ingredients:</strong>
              <ul>
                {recipeProfile.Ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          <p>{recipeProfile.Instruction}</p>
          <div className="action">
            <NavLink to="/" className="selected">
              <button> ↩️ Back</button>
            </NavLink>
            <NavLink to="/" className="selected">
              <button>✏️ Edit</button>
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

export default ItemDetailsPage;
