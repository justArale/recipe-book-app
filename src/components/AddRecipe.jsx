import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddRecipe.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import placeholderImage from "../assets/placeholder.svg";

// Pass nothing for add recipe or the values of the current recipe based on its ID
function AddRecipe({ addRecipe, existingRecipe }) {
  const { recipeId } = useParams();
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes"))
  );

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      try {
        setRecipes(JSON.parse(storedRecipes));
      } catch (error) {
        console.error("Error parsing recipes from localStorage:", error);
      }
    } else {
      console.log("No recipes found in localStorage.");
    }
  }, []);

  const [Name, setName] = useState(existingRecipe?.Name || "");

  const [Description, setDescription] = useState(
    existingRecipe?.Description || ""
  );
  const [img, setImg] = useState(existingRecipe?.img || "");

  // Map over Ingredient to get the value of amount and name because there are nested Objects in an Array
  const [amount, setAmount] = useState(
    existingRecipe?.Ingredients.map((ingre) => ingre.amount) || [""]
  );

  const [ingredient, setIngredient] = useState(
    existingRecipe?.Ingredients.map((ingre) => ingre.name) || [""]
  );
  const [Instruction, setInstruction] = useState(
    existingRecipe?.Instruction || [""]
  );
  const handleNameInput = (e) => setName(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);
  const handleFileUpload = (e) => setImg(URL.createObjectURL(e.target.file[0]));

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
    const updatedInstructions = [...Instruction];
    updatedInstructions[index] = e.target.value;
    setInstruction(updatedInstructions);
  };

  function updateRecipe(updatedRecipe) {
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = existingRecipes.map((rec) =>
      rec.Id === updatedRecipe.Id ? updatedRecipe : rec
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  }

  function addNewRecipe(newRecipe) {
    const updatedRecipeList = [...recipes, newRecipe];
    setRecipes(updatedRecipeList);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipeList));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      Id: recipeId || Date.now().toString(), // Use timestamp if no recipeId provided
      Name,
      Description,
      img: img, // Use selected image or placeholder image
      Ingredients: ingredient
        .map((name, index) => ({ amount: amount[index], name: name }))
        .filter((ing) => ing.name.trim() !== ""), // Remove empty ingredient row
      Instruction: Instruction.filter((instr) => instr.trim() !== ""), // Remove empty instruction row
    };

    // check if recipeId is true
    if (recipeId) {
      updateRecipe(updatedRecipe);
    } else {
      addNewRecipe(updatedRecipe);
    }

    // back to homepage
    navigate("/");
    // jump to the top
    window.scrollTo(0, 0);
  };

  const addNewField = () => {
    setInstruction([...Instruction, ""]);
  };

  const addNewIngredient = () => {
    setAmount([...amount, ""]);
    setIngredient([...ingredient, ""]);
  };

  useEffect(() => {
    // Update local storage whenever recipes state changes
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

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
              <label className="uploadButton">
                <input
                  type="file"
                  name="img"
                  src={img}
                  alt={`${Name}+Img`}
                  onChange={handleFileUpload}
                />{" "}
                🖼️ Choose Image
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
                // Add a new line if the last line is clicked
                onClick={
                  index === ingredient.length - 1 ? addNewIngredient : null
                }
              />
            </div>
          ))}
        </div>
        <div className="addRecipe-instruction">
          <label className="bodyLarge">Instruction</label>
          {Instruction.map((instructionText, index) => (
            <textarea
              key={index}
              required
              className="body instuction-input"
              rows="auto"
              name="instruction"
              placeholder={`${index + 1}. Instruction...`}
              value={instructionText}
              onChange={(e) => handleInstructionInput(e, index)}
              onClick={index === Instruction.length - 1 ? addNewField : null}
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
