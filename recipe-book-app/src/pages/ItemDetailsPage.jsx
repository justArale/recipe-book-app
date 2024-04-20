import { NavLink, useParams } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";

function ItemDetailsPage() {
  const { recipeId } = useParams();
  const [recipeProfile, setRecipeProfile] = useState(null);

  useEffect(() => {
    const recipe = recipesData.find((recipe) => recipe.Id === recipeId);
    setRecipeProfile(recipe);
  }, [recipeId]);

  return (
    <div>
      <h1>Recipe Details Page</h1>
      {recipeProfile && (
        <div>
          <h2>{recipeProfile.Name}</h2>
          <p>{recipeProfile.Description}</p>
          <p>{recipeProfile.Ingredients}</p>
          <p>{recipeProfile.Instruction}</p>

          <NavLink to="/" className="selected">
            <button>Back</button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default ItemDetailsPage;
