import AddRecipe from "../components/AddRecipe";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";

function NewRecipePage() {
  const [recipes, setRecipes] = useState(recipesData);
  const [recipesDataCopy, setRecipesDataCopy] = useState(recipesData);

  const addNewRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    const updatedRecipesDataCopy = [...recipesDataCopy, newRecipe];

    setRecipes(updatedRecipes);
    setRecipesDataCopy(updatedRecipesDataCopy);
  };

  useEffect(() => {
    // Update local storage whenever recipes state changes
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);
  return <AddRecipe addRecipe={addNewRecipe} />;
}

export default NewRecipePage;
