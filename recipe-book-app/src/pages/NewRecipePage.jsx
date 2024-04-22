import AddRecipe from "../components/AddRecipe";
import recipesData from "../components/recipes.json";
import { useState } from "react";

function NewRecipePage() {
  const [recipes, setRecipes] = useState(recipesData);
  const [recipesDataCopy, setRecipesDataCopy] = useState(recipesData);

  const addNewRecipe = (newRecipe) => {
    // Create a new array
    const updatedRecipes = [...recipes, newRecipe];
    const updatedRecipesDataCopy = [...recipesDataCopy, newRecipe];

    setRecipes(updatedRecipes);
    setRecipesDataCopy(updatedRecipesDataCopy);
  };

  return <AddRecipe addRecipe={addNewRecipe} />;
}

export default NewRecipePage;
