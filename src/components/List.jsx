import "./List.css";

export default function List({ recipe }) {
  return (
    <div className="list-recipe">
      <div className="imageWrapper">
        <img
          src={recipe.image ? recipe.image : ""}
          alt={recipe.image ? recipe.name : ""}
          className={`${recipe.image ? "image" : ""}`}
        />
      </div>
      <div className="listContent">
        <h3 className="title">{recipe.name}</h3>
        <p className="mainFont">{recipe.description}</p>
      </div>
    </div>
  );
}
