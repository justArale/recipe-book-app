import { useState } from "react";
import { Link } from "react-router-dom";
import "./AddRecipe.css";

//// /// 7//
// Pass nothing for add recipe or the values of the current recipe based on its ID
function AddRecipe({ addRecipe, existingRecipe }) {
  const [name, setName] = useState(existingRecipe?.Name || "");

  const [description, setDescription] = useState(
    existingRecipe?.Description || ""
  );
  const [file, setFile] = useState(existingRecipe?.img || "");

  // Map over Ingredient to get the value of amount and name because there are nested Objects in an Array
  const [ingredientAmount, setIngredientAmount] = useState(
    existingRecipe?.Ingredients.map((ingredient) => ingredient.amount) || [""]
  );
  console.log("zzzzzz", ingredientAmount);
  const [ingredient, setIngredient] = useState(
    existingRecipe?.Ingredients.map((ingredient) => ingredient.name) || [""]
  );
  const [instruction, setInstruction] = useState(
    existingRecipe?.Instruction || [""]
  );

  const handleNameInput = (e) => setName(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);
  const handleFileUpload = (e) =>
    setFile(URL.createObjectURL(e.target.files[0]));

  const handleIngredientAmountInput = (e, index) => {
    const updatedIngredientAmount = [...ingredientAmount];
    updatedIngredientAmount[index] = e.target.value;
    setIngredientAmount(updatedIngredientAmount);
  };
  const handleIngredientInput = (e, index) => {
    const updatedIngredient = [...ingredient];
    updatedIngredient[index] = e.target.value;
    setIngredient(updatedIngredient);
  };
  const handleInstructionInput = (e, index) => {
    const updatedInstructions = [...instruction];
    updatedInstructions[index] = e.target.value;
    setInstruction(updatedInstructions);
  };

  // preventDefault is build in and prevents the default behavior of submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      description,
      file,
      ingredientAmount,
      ingredient,
      instruction,
    };

    props.addRecipe(newRecipe);
    //     props.updateRecipe(updatedRecipe);

    // Reset the state
    setName("");
    setDescription("");
    setFile("");
    setIngredientAmount([""]);
    setIngredient([""]);
    setInstruction([""]);
  };

  const addNewField = () => {
    setInstruction([...instruction, ""]);
  };

  const addNewIngredient = () => {
    setIngredientAmount([...ingredientAmount, ""]);
    setIngredient([...ingredient, ""]);
  };

  return (
    <div>
      <form className="addRecipe" onSubmit={handleSubmit}>
        <div className="addRecipe-main">
          <h4 className="addRecipe-header">Add your Recipe</h4>
          <div className="addRecipe-headerRow">
            <div className="addRecipe-headerContent">
              <input
                type="text"
                name="name"
                className="title"
                placeholder="Title..."
                value={name}
                onChange={handleNameInput}
              />

              <textarea
                type="text"
                name="description"
                className="description"
                placeholder="Description..."
                value={description}
                onChange={handleDescriptionInput}
              />
            </div>
            <div className="uploadButtonWrapper">
              <label className="uploadButton">
                <input
                  type="file"
                  src={file}
                  alt={`${name}+Img`}
                  onChange={handleFileUpload}
                />{" "}
                🖼️ Choose Image
              </label>
            </div>
          </div>
        </div>
        <div className="addRecipe-ingredient">
          <label className="ingredient-header">Ingredients</label>
          {ingredientAmount.map((ingredientAmount, index) => (
            <div className="ingredient-input" key={index}>
              <input
                type="text"
                name="ingredient-amount"
                placeholder="1..."
                value={ingredientAmount}
                onChange={(e) => handleIngredientAmountInput(e, index)}
              />
              <input
                type="text"
                name="ingredient"
                placeholder="Ingredient..."
                value={ingredient[index]}
                onChange={(e) => handleIngredientInput(e, index)}
                // Add a new line if the last line is clicked
                onClick={
                  index === ingredient.length - 1 ? addNewIngredient : null
                }
              />
            </div>
          ))}
        </div>
        <div className="addRecipe-instruction">
          <label className="instruction-header">Instruction</label>
          {instruction.map((instructionText, index) => (
            <input
              key={index}
              className="instuction-input"
              type="text"
              name="instruction"
              placeholder={`${index + 1}. Instruction...`}
              value={instructionText}
              onChange={(e) => handleInstructionInput(e, index)}
              onClick={index === instruction.length - 1 ? addNewField : null}
            />
          ))}
        </div>
        <div className="action">
          <button type="delete">
            <a href="/">❌ Cancel</a>
          </button>

          <button type="submit">
            <a href="/">✅ Save</a>
          </button>
          {/* <button type="submit">
            <a
              {...(existingRecipe
                ? (href = `/recipes/${recipeId}`)
                : (href = "/"))}
            >
              ✅ Save
            </a>
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
