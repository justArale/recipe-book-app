import "./List.css";
import placeholderImage from "../assets/placeholder.svg";

export default function List({ recipe }) {
  return (
    <div className="recipe-list">
      <div className="list-recipe">
        <div className="image-wrapper">
          <img
            src={recipe.image ? recipe.image : placeholderImage}
            alt={recipe.name}
            className={`${recipe.image ? "image" : ""}`}
          />
        </div>
        <div className="list-content">
          <div className="list-title">
            <h3 className="headline">{recipe.name}</h3>
          </div>
          <div className="list-description">
            <p className="body">{recipe.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
