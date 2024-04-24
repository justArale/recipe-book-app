import List from "../components/List";
import { Link, NavLink, useParams } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";

function DashboardPage() {
  const [recipes] = useState(recipesData);

  return (
    <div className="recipe-list-wrapper">
      {/* <h1>Recipe List</h1> */}
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.Id}>
            <Link to={`/recipes/${recipe.Id}`}>
              <List recipe={recipe} />
            </Link>
          </div>
        ))}
    </div>
  );
}

export default DashboardPage;
