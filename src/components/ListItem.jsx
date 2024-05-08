import "./ListItem.css";
import recipesDB from "./recipes.json";
import { useState, useEffect } from "react";

export default function ListItem(props) {
  const { recipe } = props;
  const [recipes, setRecipes] = useState(recipesDB);

  const deleteRecipe = (recipeId) => {
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.Id !== recipeId;
    });
    setRecipes(filteredRecipes);
  };

  return (
    <div className="listItem" key={recipe.Id}>
      <h2 className="name">{recipe.Name}</h2>
      <img src={recipe.url} alt={recipe.Name} />
      <p className="description">
        <strong>Description: </strong>
        {recipe.Description}
      </p>
      {recipe.Ingredients < 10 && <p>Less then 10 ingredients </p>}
      <div className="ingredients">
        <strong>Ingredients: </strong>
        <ul>
          {recipe.Ingredients.map((ingredient) => (
            <li key={recipe.Id}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <p className="instruction">
        <strong>Instruction: </strong>
        {recipe.Instruction}
      </p>
      <button onClick={() => deleteRecipe(recipe.Id)} className="btn-delete">
        🗑️ Delete
      </button>
    </div>
  );
}
