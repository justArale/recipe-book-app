import { useParams } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";
import "../components/ListItem.css";
///
function ItemDetailsPage() {
  // const { recipeId } = useParams();
  // const [recipes, setRecipes] = useState(
  //   JSON.parse(localStorage.getItem("recipes")) || recipesData
  // );

  // const recipeProfile = recipesData.find((recipe) => recipe.Id === recipeId);

  // const deleteRecipe = (recipeId) => {
  //   const filteredRecipes = recipes.filter((recipe) => {
  //     return recipe.Id !== recipeId;
  //   });
  //   setRecipes(filteredRecipes);
  // };

  // useEffect(() => {
  //   // Update local storage whenever recipes state changes
  //   localStorage.setItem("recipes", JSON.stringify(recipes));
  // }, [recipes]);

  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || recipesData
  );

  useEffect(() => {
    // jump to the top
    window.scrollTo(0, 0);
  }, []);

  // Suchen des Rezepts in den gespeicherten Rezepten aus dem Local Storage
  const recipeProfile = recipes.find((recipe) => recipe.Id === recipeId);

  const deleteRecipe = (recipeId) => {
    const filteredRecipes = recipes.filter((recipe) => recipe.Id !== recipeId);
    setRecipes(filteredRecipes);
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
            <img src={recipeProfile.img} />
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
              <a href="/">🗑️ Delete</a>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
/////////
export default ItemDetailsPage;
