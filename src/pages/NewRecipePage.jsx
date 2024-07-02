import AddRecipe from "../components/AddRecipe";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";

function NewRecipePage() {
  // const [recipes, setRecipes] = useState(
  //   JSON.parse(localStorage.getItem("recipes"))
  // );
  // const [recipesDataCopy, setRecipesDataCopy] = useState(
  //   JSON.parse(localStorage.getItem("recipes"))
  // );

  // const addNewRecipe = (newRecipe) => {
  //   const updatedRecipes = [...recipes, newRecipe];
  //   const updatedRecipesDataCopy = [...recipesDataCopy, newRecipe];

  //   setRecipes(updatedRecipes);
  //   setRecipesDataCopy(updatedRecipesDataCopy);
  // };

  // useEffect(() => {
  //   // Update local storage whenever recipes state changes
  //   localStorage.setItem("recipes", JSON.stringify(recipes));
  // }, [recipes]);

  // return <AddRecipe addRecipe={addNewRecipe} />;
  return <AddRecipe />;
}

export default NewRecipePage;
