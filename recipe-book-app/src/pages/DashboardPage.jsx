import List from "../components/List";
import { Link, NavLink } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState, useEffect } from "react";

function DashboardPage() {
  const [recipes] = useState(recipesData);

  return (
    <div>
      <h1>Recipe Dashboard</h1>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <Link to={`/recipes/${index}`}>
            <List {...recipe} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
