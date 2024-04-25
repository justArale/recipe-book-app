import List from "../components/List";
import { Link } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";

function DashboardPage() {
  // const [recipes] = useState(recipesData);
  // Initialize state from local storage if available, otherwise use recipesData
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || recipesData
  );
  return (
    <div className="grid-container">
      {recipes &&
        recipes.map((recipe, index) => (
          <div key={recipe.Id} className="findTheChild">
            {index % 2 === 0 && <div className="grid-row" />}
            <div className="grid-item">
              <Link to={`/recipes/${recipe.Id}`} className="listItem-link">
                <List recipe={recipe} className="listItem-container" />
              </Link>
            </div>
            {index % 2 === 1 || index === recipes.length - 1 ? (
              <div className="grid-row" />
            ) : null}
          </div>
        ))}
    </div>
  );
}

export default DashboardPage;
