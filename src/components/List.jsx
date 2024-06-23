import "./List.css";
import placeholderImage from "../assets/placeholder.svg";

export default function List({ recipe }) {
  return (
    <div className="recipe-list">
      <div className="list-recipe">
        <div className="image-wrapper">
          <img
            src={recipe.img ? recipe.img : placeholderImage}
            alt={recipe.Name}
            className={`${recipe.img ? "image" : ""}`}
          />
        </div>
        <div className="list-content">
          <div className="list-title">
            <h3 className="headline">{recipe.Name}</h3>
          </div>
          <div className="list-description">
            <p className="body">{recipe.Description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
