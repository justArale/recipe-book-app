import List from "../components/List";
import { Link, NavLink, useParams } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";

function DashboardPage() {
  const [recipes] = useState(recipesData);

  return (
    <div>
      <h1>Recipe Dashboard</h1>
      {recipes.map((recipe) => (
        <div key={recipe.Id}>
          <Link to={`/recipes/${recipe.Id}`}>
            <h3>{recipe.Name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
