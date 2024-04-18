import "./ListItem.css";

export default function ListItem(props) {
  const { recipe, index, clickToDelete } = props;
  return (
    <div className="listItem" key={index}>
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
          {recipe.Ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
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
