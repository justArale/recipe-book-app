import "./ListItem.css";

export default function ListItem(props) {
  const { recipe, clickToDelete } = props;
  return (
    <div className="listItem" key={recipe.Id}>
      <h2 className="name">{recipe.Name}</h2>
      <img src={recipe.url} alt={recipe.Name} />
      <p className="description">
        <strong>Description: </strong>
        {recipe.Description}
      </p>
      {recipe.Ingredients < 10 && <p>Less then 10 ingredients </p>}
      <div className="ingredients">
        <strong>Ingredients: </strong>
        <ul>
          {recipe.Ingredients.map((ingredient) => (
            <li key={recipe.Id}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <p className="instruction">
        <strong>Instruction: </strong>
        {recipe.Instruction}
      </p>

      <button onClick={() => clickToDelete(recipe.Name)} className="btn-delete">
        Delete
      </button>
    </div>
  );
}
