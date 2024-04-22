import { useState } from "react";
import { Link } from "react-router-dom";

function AddRecipe(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleNameInput = (e) => setName(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);
  const handleFileUpload = (e) =>
    setFile(URL.createObjectURL(e.target.files[0]));
  const handleIngredientsInput = (e) => setIngredients(e.target.value);
  const handleInstructionInput = (e) => setInstruction(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      description,
      file,
      ingredients,
      instruction,
    };

    props.addRecipe(newRecipe);

    // Reset the state
    setName("");
    setDescription("");
    setFile("");
    setIngredients("");
    setInstruction("");
  };

  return (
    <div className="AddRecip">
      <h4>Add your Recipe</h4>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameInput}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionInput}
        />

        <label>Image:</label>
        <input
          type="file"
          src={file}
          alt={`${name}+Img`}
          onChange={handleFileUpload}
        />

        <label>Ingredients:</label>
        <input
          type="text"
          name="ingredients"
          value={ingredients}
          onChange={handleIngredientsInput}
        />

        <label>Instruction: </label>
        <input
          type="text"
          name="instruction"
          value={instruction}
          onChange={handleInstructionInput}
        />
        <Link to="/">
          <button type="delete">❌ Cancel</button>
          <button type="submit">✅ Save</button>
        </Link>
      </form>
    </div>
  );
}

export default AddRecipe;
