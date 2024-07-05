// AddRecipe.jsx
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddRecipe.css";
import fileUploadService from "../service/file-upload.service";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Pass nothing for add recipe or the values of the current recipe based on its ID
function AddRecipe({ addRecipe, existingRecipe }) {
  const { user } = useContext(AuthContext);
  const { authorId, recipeId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);

  let navigate = useNavigate();

  const [Name, setName] = useState(existingRecipe?.name || "");
  const [Description, setDescription] = useState(
    existingRecipe?.description || ""
  );
  const [img, setImg] = useState(existingRecipe?.image || "");
  const [amount, setAmount] = useState(
    existingRecipe?.ingredients?.map((ingre) => ingre.amount) || [""]
  );
  const [ingredient, setIngredient] = useState(
    existingRecipe?.ingredients?.map((ingre) => ingre.name) || [""]
  );
  const [instruction, setInstruction] = useState(
    existingRecipe?.instruction || [""]
  );

  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name);
      setDescription(existingRecipe.description);
      setImg(existingRecipe.image);
      setAmount(existingRecipe.ingredients.map((ingre) => ingre.amount));
      setIngredient(existingRecipe.ingredients.map((ingre) => ingre.name));
      setInstruction(existingRecipe.instruction);
    }
  }, [existingRecipe]);

  const handleNameInput = (e) => setName(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);

  const handleFileUpload = async (event) => {
    try {
      setImageIsLoading(true);
      const file = event.target.files[0];
      const fileData = new FormData();
      fileData.append("file", file);

      const fileUrl = await fileUploadService.uploadRecipeImage(fileData);
      setImg(fileUrl);
      setImageIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageIsLoading(false);
    }
  };

  const handleIngredientAmountInput = (e, index) => {
    const updatedIngredientAmount = [...amount];
    updatedIngredientAmount[index] = e.target.value;
    setAmount(updatedIngredientAmount);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const recipeData = {
      name: Name,
      image: img,
      description: Description,
      ingredients: ingredient
        .map((name, index) => ({ amount: amount[index], name: name }))
        .filter((ing) => ing.name.trim() !== ""), // Get rip of empty lines
      instruction: instruction.filter((instr) => instr.trim() !== ""), // Get rip of empty lines
      author: user,
    };

    try {
      let recipeResponse;
      if (recipeId) {
        // Update recipe
        recipeResponse = await axios.put(
          `${API_URL}/api/user/${authorId}/recipes/${recipeId}`,
          recipeData,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log("Recipe changed successfully:", recipeResponse.data); // Debugging log
      } else {
        // Create new recipe
        recipeResponse = await axios.post(
          `${API_URL}/api/user/${user._id}/recipes`,
          recipeData,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log("Recipe created successfully:", recipeResponse.data); // Debugging log
      }

      // Go back to recipe detail or dashboard
      if (recipeId) {
        navigate(`/user/${authorId}/recipes/${recipeId}`);
      } else {
        navigate("/");
      }
      // Jump to the top
      window.scrollTo(0, 0);
    } catch (error) {
      console.log("Error creating or updating recipe:", error); // Debugging log
      const errorDescription =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

  const addNewField = () => {
    setInstruction([...instruction, ""]);
  };

  const addNewIngredient = () => {
    setAmount([...amount, ""]);
    setIngredient([...ingredient, ""]);
  };

  return (
    <div className="addRecipe-page">
      <form className="addRecipe" onSubmit={handleSubmit}>
        <div className="addRecipe-main">
          {existingRecipe ? (
            <h4 className="bodyLarge addRecipe-header">Edit your Recipe</h4>
          ) : (
            <h4 className="bodyLarge addRecipe-header">Add your Recipe</h4>
          )}

          <div className="addRecipe-headerRow">
            <div className="addRecipe-headerContent">
              <input
                required
                type="text"
                name="Name"
                className="body title"
                placeholder="Title..."
                value={Name}
                onChange={handleNameInput}
              />

              <textarea
                required
                type="text"
                name="Description"
                className="body description"
                placeholder="Description..."
                value={Description}
                onChange={handleDescriptionInput}
              />
            </div>
            <div className="uploadButtonWrapper">
              {img && (
                <img
                  src={img}
                  alt={`${Name} preview`}
                  className="image-preview"
                />
              )}
              <label className="uploadButton">
                <input
                  type="file"
                  name="img"
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/webm, image/webp, image/heic"
                  onChange={handleFileUpload}
                />
                {imageIsLoading
                  ? "🔄 loading ..."
                  : img
                  ? "🖼️ Change Image"
                  : "🖼️ Choose Image"}
              </label>
            </div>
          </div>
        </div>
        <div className="addRecipe-ingredient">
          <label className="bodyLarge">Ingredients</label>
          {amount.map((amount, index) => (
            <div className="ingredient-input" key={index}>
              <input
                required
                type="text"
                name="ingredient-amount"
                className="body"
                placeholder="1..."
                value={amount}
                onChange={(e) => handleIngredientAmountInput(e, index)}
              />
              <input
                required
                type="text"
                name="ingredient"
                className="body"
                placeholder="Ingredient..."
                value={ingredient[index]}
                onChange={(e) => handleIngredientInput(e, index)}
                onClick={
                  index === ingredient.length - 1 ? addNewIngredient : null
                }
              />
            </div>
          ))}
        </div>
        <div className="addRecipe-instruction">
          <label className="bodyLarge">Instruction</label>
          {instruction.map((instructionText, index) => (
            <textarea
              key={index}
              required
              className="body instuction-input"
              rows="auto"
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
            <a href="/" className="body noUnderline primaryColor boldWeight">
              ❌ Cancel
            </a>
          </button>
          <Link to={"/"}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="body primaryColor boldWeight"
            >
              ✅ Save
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
