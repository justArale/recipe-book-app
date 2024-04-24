import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="header">
      <div className="inner">
        <div className="nav-title">
          <h1 className="nav-header">Recipe Book</h1>
          <p className="nav-description">This is my awesome list of recipes.</p>
        </div>
        <div className="newRecipeNavigation">
          <button className="addRecipe-button">
            <a href="/newrecipe">New recipe</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

{
  /* <Link to={`/${to}`}>
  <button className="my-button">Take me to {to === "" ? "home" : to}</button>
</Link>; */
}
