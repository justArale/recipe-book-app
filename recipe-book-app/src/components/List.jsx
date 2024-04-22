import recipesDB from "./recipes.json";
import { useState } from "react";
import "./List.css";
import ListItem from "./ListItem";

export default function List({ recipe }) {
  const [recipes, setRecipes] = useState(recipesDB);

  // put that in ListItem.jsx
  // const deleteRecipe = (recipeId) => {
  //   const filteredRecipes = recipes.filter((recipe) => {
  //     return recipe.Id !== recipeId;
  //   });
  //   setRecipes(filteredRecipes);
  // };

  return (
    <div>
      <img src={recipe.img} alt={recipe.Name} />
      <h3>{recipe.Name}</h3>
      <p>{recipe.Description}</p>
    </div>
  );

  // return (
  //   <div className="listContainer">
  //     <div className="recipeContainer">
  //       {recipes.map((recipe) => {
  //         return (
  //           <ListItem
  //             key={recipe.Id}
  //             recipe={recipe}
  //             clickToDelete={deleteRecipe}
  //           />
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}
