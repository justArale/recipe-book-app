import "./Navbar.css";
import { Link, NavLink, useParams } from "react-router-dom";
import AddRecipe from "./AddRecipe";

function Navbar() {
  return (
    <nav className="header">
      <div className="inner">
        <div className="nav-title">
          <h1 className="nav-header">Recipe Book</h1>
          <p className="nav-description">This is my awesome list of recipes.</p>
        </div>
        <div className="newRecipeNavigation">
          <Link to={`/newrecipe`}>
            <button>New recipe</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

{
  /* <Link to={`/${to}`}>
  <button className="my-button">Take me to {to === "" ? "home" : to}</button>
</Link>; */
}
