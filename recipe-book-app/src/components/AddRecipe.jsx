import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddRecipe.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// Pass nothing for add recipe or the values of the current recipe based on its ID
function AddRecipe({ addRecipe, existingRecipe }) {
  const { recipeId } = useParams();
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes"))
  );

  const generateId = () => {
    // Random ID
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

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
  const [Id, setId] = useState(existingRecipe?.Id || generateId());
  const [Name, setName] = useState(existingRecipe?.Name || "");

  const [Description, setDescription] = useState(
    existingRecipe?.Description || ""
  );
  const [img, setImg] = useState(existingRecipe?.img || "");
  /////
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

  // preventDefault is build in and prevents the default behavior of submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newRecipe = {
  //     Id,
  //     Name,
  //     Description,
  //     img,
  //     Ingredients: ingredient.map((name, index) => ({
  //       amount: amount[index],
  //       name: name,
  //     })),
  //     Instruction,
  //   };

  //   const updatedRecipeList = [...recipes, newRecipe];
  //   setRecipes(updatedRecipeList);

  //   localStorage.setItem("recipes", JSON.stringify(updatedRecipeList));
  //   console.log("recipe added");

  //   // const existingRecipe = JSON.parse(localStorage.getItem("recipe")) || [];
  //   // const updatedRecipes = existingRecipe.map((recipe) =>
  //   //   recipe.Id === recipeId ? updatedRecipes : recipe
  //   // );
  //   // localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

  //   // Reset the state
  //   setId("");
  //   setName("");
  //   setDescription("");
  //   setImg("");
  //   setAmount([""]);
  //   setIngredient([""]);
  //   setInstruction([""]);

  //   navigate("/");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      Id,
      Name,
      Description,
      img,
      Ingredients: ingredient.map((name, index) => ({
        amount: amount[index],
        name: name,
      })),
      Instruction,
    };

    const updatedRecipeList = [...recipes, updatedRecipe];
    setRecipes(updatedRecipeList);

    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = existingRecipes.map((rec) =>
      rec.Id === recipeId ? updatedRecipe : rec
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    navigate("/");
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
    <div>
      <form className="addRecipe" onSubmit={handleSubmit}>
        <div className="addRecipe-main">
          <h4 className="addRecipe-header">Add your Recipe</h4>
          <div className="addRecipe-headerRow">
            <div className="addRecipe-headerContent">
              <input
                required
                type="text"
                name="Name"
                className="title"
                placeholder="Title..."
                value={Name}
                onChange={handleNameInput}
              />

              <textarea
                required
                type="text"
                name="Description"
                className="description"
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
          <label className="ingredient-header">Ingredients</label>
          {amount.map((amount, index) => (
            <div className="ingredient-input" key={index}>
              <input
                required
                type="text"
                name="ingredient-amount"
                placeholder="1..."
                value={amount}
                onChange={(e) => handleIngredientAmountInput(e, index)}
              />
              <input
                required
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
          {Instruction.map((instructionText, index) => (
            <input
              key={index}
              required
              className="instuction-input"
              type="text"
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
            <a href="/">❌ Cancel</a>
          </button>

          <button type="submit" onClick={handleSubmit}>
            <a href="/">✅ Save</a>
          </button>
          {/* <button type="submit">
            ✅ Save
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
