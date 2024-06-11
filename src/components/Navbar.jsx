import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="header">
      <div className="inner">
        <div className="nav-title">
          <Link to={`/`} className="navbar-header-link">
            <h1 className="nav-header">Recipe Book</h1>
          </Link>
          <p className="nav-description">This is my awesome list of recipes.</p>
        </div>
        <div className="navigation">
          <div className="sidebar-path">
            <Link to={`/`} className="home">
              <p className="home">Home</p>
            </Link>
          </div>
          <div className="sidebar-path">
            <Link to={`/about`} className="about">
              <p>About</p>
            </Link>
          </div>
          <div className="newRecipeNavigation">
            <Link to={`/newrecipe`}>
              <button className="addRecipe-button">New recipe</button>
            </Link>
          </div>
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
