import List from "../components/List";
import { Link } from "react-router-dom";
import recipesData from "../components/recipes.json";
import { useState } from "react";
import { Fragment } from "react";

function DashboardPage() {
  const [recipes] = useState(recipesData);

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
///7///7777/   /7
export default DashboardPage;
