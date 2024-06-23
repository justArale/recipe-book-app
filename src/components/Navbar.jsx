import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div className="header">
      <div className="inner">
        <div className="nav-title">
          <Link to={`/`} className="noUnderline">
            <h1 className="headline boldWeight primaryColor">Recipe Book</h1>
          </Link>
          <p className="body">This is my awesome list of recipes.</p>
        </div>
        <div className="navigation">
          <div className="sidebar-path">
            <Link
              className={`primaryColor noUnderline home ${
                location.pathname === "/" ? "active" : ""
              }`}
              to={`/`}
            >
              <p>Home</p>
            </Link>
          </div>
          <div className="sidebar-path">
            <Link
              className={`primaryColor noUnderline about ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to={`/about`}
            >
              <p>About</p>
            </Link>
          </div>
          <div className="newRecipeNavigation">
            <Link to={`/newrecipe`}>
              <button className="body noUnderline primaryColor">
                New recipe
              </button>
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
