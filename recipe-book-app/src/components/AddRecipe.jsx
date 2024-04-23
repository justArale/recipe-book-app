import { useState } from "react";
import { Link } from "react-router-dom";
import "./AddRecipe.css";

function AddRecipe(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleNameInput = (e) => setName(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);
  const handleFileUpload = (e) =>
    setFile(URL.createObjectURL(e.target.files[0]));
  const handleIngredientAmountInput = (e) =>
    setIngredientAmount(e.target.value);
  const handleIngredientInput = (e) => setIngredient(e.target.value);
  const handleInstructionInput = (e) => setInstruction(e.target.value);

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

    // Reset the state
    setName("");
    setDescription("");
    setFile("");
    setIngredientAmount("");
    setIngredient("");
    setInstruction("");
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
          <div className="ingredient-input">
            <input
              type="text"
              name="ingredient-amount"
              placeholder="1..."
              value={ingredientAmount}
              onChange={handleIngredientAmountInput}
            />
            <input
              type="text"
              name="ingredient"
              placeholder="Ingredient..."
              value={ingredient}
              onChange={handleIngredientInput}
            />
          </div>
        </div>
        <div className="addRecipe-instruction">
          <label className="instruction-header">Instruction: </label>
          <input
            className="instuction-input"
            type="text"
            name="instruction"
            placeholder="Instruction..."
            value={instruction}
            onChange={handleInstructionInput}
          />
        </div>
        <div className="action">
          <Link to="/">
            <button type="delete">❌ Cancel</button>
            <button type="submit">✅ Save</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
