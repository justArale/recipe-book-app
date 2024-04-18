import recipesDB from "./recipes.json";
import { useState } from "react";
import "./List.css";
import ListItem from "./ListItem";

export default function List() {
  const [recipes, setRecipes] = useState(recipesDB);

  const deleteRecipe = (recipeName) => {
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.Name !== recipeName;
    });
    setRecipes(filteredRecipes);
  };

  return (
    <div className="listContainer">
      <h1 className="title">Recipe List</h1>
      <div className="recipeContainer">
        {recipes.map((recipe, index) => {
          return (
            <ListItem
              key={index}
              recipe={recipe}
              clickToDelete={deleteRecipe}
            />
          );
        })}
      </div>
    </div>
  );
}
