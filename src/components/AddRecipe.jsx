// AddRecipe.jsx
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddRecipe.css";
import {
  uploadRecipeImage,
  deleteRecipeImage,
} from "../service/api/image.service";
import { createRecipe, updateRecipe } from "../service/api/recipe.service";
import { AuthContext } from "../context/auth.context";
import { Image } from "@just1arale/icons";
import { Edit } from "@just1arale/icons";
import { Delete } from "@just1arale/icons";
import { Check } from "@just1arale/icons";
import { Cancel } from "@just1arale/icons";
import { Clear } from "@just1arale/icons";
import { extractPublicId } from "cloudinary-build-url";

// Pass nothing for add recipe or the values of the current recipe based on its ID
function AddRecipe({ addRecipe, existingRecipe }) {
  const { user } = useContext(AuthContext);
  const { authorId, recipeId } = useParams();
  const [errorMessageMain, setErrorMessageMain] = useState("");
  const [errorMessageIngredient, setErrorMessageIngredient] = useState("");
  const [errorMessageInstruction, setErrorMessageInstruction] = useState("");
  const [oldImageId, setOldImageId] = useState();
  const [imageIsLoading, setImageIsLoading] = useState(false);

  let navigate = useNavigate();

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

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

  useEffect(() => {
    document
      .querySelectorAll(
        'textarea[name="instruction"], textarea[name="Description"]'
      )
      .forEach((textarea) => {
        adjustTextareaHeight(textarea);
      });
  }, [Description, instruction]);

  const handleNameInput = (e) => setName(e.target.value);

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleFileUpload = async (event) => {
    try {
      setImageIsLoading(true);
      const oldId = getOldImageId(img);
      setOldImageId(oldId);

      const file = event.target.files[0];
      const fileData = new FormData();
      fileData.append("file", file);

      const fileUrl = await uploadRecipeImage(fileData);
      setImg(fileUrl);
      setImageIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageIsLoading(false);
    }
  };

  const handleFileDelete = () => {
    const oldId = getOldImageId(img);
    setOldImageId(oldId);
    setImg("");
  };

  const getOldImageId = (imageURL) => {
    if (!imageURL) {
      return "";
    }
    const oldPath = extractPublicId(imageURL);

    const segments = oldPath.split("/");
    return segments[segments.length - 1];
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
    adjustTextareaHeight(e.target);
  };

  const removeInputField = (type, index) => {
    if (type === "ingredient") {
      const updatedAmount = [...amount];
      const updatedIngredient = [...ingredient];
      updatedAmount.splice(index, 1);
      updatedIngredient.splice(index, 1);
      setAmount(updatedAmount);
      setIngredient(updatedIngredient);
    } else if (type === "instruction") {
      const updatedInstructions = [...instruction];
      updatedInstructions.splice(index, 1);
      setInstruction(updatedInstructions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    if (!Name.trim() || !Description.trim()) {
      setErrorMessageMain("Name / Description is required.");
      return;
    }

    if (ingredient.filter((ing) => ing.trim() !== "").length === 0) {
      setErrorMessageIngredient("At least one ingredient is required.");
      return;
    }

    if (instruction.filter((instr) => instr.trim() !== "").length === 0) {
      setErrorMessageInstruction("At least one instruction is required.");
      return;
    }

    const recipeData = {
      name: Name,
      image: img,
      description: Description,
      ingredients: ingredient
        .map((name, index) => ({ amount: amount[index], name: name }))
        .filter((ing) => ing.name.trim() !== ""), // Get rid of empty lines
      instruction: instruction.filter((instr) => instr.trim() !== ""), // Get rid of empty lines
      author: user,
    };

    try {
      if (recipeId) {
        if (oldImageId) {
          // Delete image from cloudinary storage
          deleteRecipeImage(oldImageId, recipeId);
        }
        // Update recipe
        updateRecipe(authorId, recipeId, recipeData);
      } else {
        // Create new recipe
        createRecipe(user._id, recipeData);
      }

      // Go back to recipe detail or dashboard
      if (recipeId) {
        navigate(`/user/${authorId}/recipes/${recipeId}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data?.message);
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
          <h4 className="headline addRecipe-header">Recipe</h4>

          <div className="addRecipe-headerRow">
            <div className="addRecipe-headerContent">
              <input
                required
                type="text"
                name="Name"
                className="mainFont inputField"
                placeholder="Title..."
                value={Name}
                onChange={handleNameInput}
              />

              <textarea
                required
                type="text"
                name="Description"
                className="mainFont description"
                placeholder="Description..."
                value={Description}
                onChange={handleDescriptionInput}
              />
              {errorMessageMain && (
                <p className="mainFont">{errorMessageMain}</p>
              )}
            </div>
            <div className="uploadButtonWrapper">
              {img && (
                <img
                  src={img}
                  alt={`${Name} preview`}
                  className="image-preview"
                />
              )}
              {img && !imageIsLoading && (
                <button
                  type="button"
                  className="zindex buttonReverseHalf"
                  onClick={handleFileDelete}
                >
                  <div className="buttonContentWrapper">
                    <Delete width="16" height="16" alt="Delete Icon" />
                    <span className="buttonFont">Remove</span>
                  </div>
                </button>
              )}
              <label
                className={`uploadButton ${img ? "buttonReverseHalf" : ""}`}
              >
                <input
                  type="file"
                  name="img"
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/webm, image/webp, image/heic"
                  onChange={handleFileUpload}
                />
                {imageIsLoading ? (
                  "🔄 loading ..."
                ) : img ? (
                  <div className="buttonContentWrapper">
                    <Edit width="16" height="16" alt="Edit Icon" />
                    <span className="buttonFont">Change</span>
                  </div>
                ) : (
                  <div className="buttonContentWrapper">
                    <Image width="16" height="16" alt="Image Icon" />
                    <span className="buttonFont">Choose Image</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="addRecipe-ingredient">
          <label className="headline">Ingredients</label>
          {amount.map((amount, index) => (
            <div className="ingredient-input" key={index}>
              <input
                type="text"
                name="ingredient-amount"
                className="mainFont"
                placeholder="1..."
                value={amount}
                onChange={(e) => handleIngredientAmountInput(e, index)}
              />
              <input
                type="text"
                name="ingredient"
                className="mainFont"
                placeholder="Ingredient..."
                value={ingredient[index]}
                onChange={(e) => handleIngredientInput(e, index)}
                onClick={
                  index === ingredient.length - 1 ? addNewIngredient : null
                }
              />
              {ingredient[index].trim() !== "" && ingredient.length > 1 && (
                <div
                  className="clearIcon"
                  onClick={() => removeInputField("ingredient", index)}
                >
                  <Clear
                    width="16"
                    height="16"
                    alt="Clear Icon"
                    color="#a39689"
                  />
                </div>
              )}
            </div>
          ))}
          {errorMessageIngredient && (
            <p className="mainFont">{errorMessageIngredient}</p>
          )}
        </div>
        <div className="addRecipe-instruction">
          <label className="headline">Instruction</label>
          {instruction.map((instructionText, index) => (
            <div className="instructionLine" key={index}>
              <textarea
                className="mainFont instuction-input"
                rows="auto"
                name="instruction"
                placeholder={`${index + 1}. Instruction...`}
                value={instructionText}
                onChange={(e) => handleInstructionInput(e, index)}
                onClick={index === instruction.length - 1 ? addNewField : null}
              />
              {instructionText.trim() !== "" && instruction.length > 1 && (
                <div
                  className="clearIcon"
                  onClick={() => removeInputField("instruction", index)}
                >
                  <Clear
                    width="16"
                    height="16"
                    alt="Clear Icon"
                    color="#a39689"
                  />
                </div>
              )}
            </div>
          ))}
          {errorMessageInstruction && (
            <p className="mainFont">{errorMessageInstruction}</p>
          )}
        </div>
        <div className="action">
          <Link to={`/user/${authorId}/recipes/${recipeId}`}>
            <button
              type="button"
              className="buttonFont noUnderline primaryColor"
            >
              <div className="buttonContentWrapper">
                <Cancel width="16" height="16" alt="Cancel Icon" />
                <span className="buttonFont">Cancel</span>
              </div>
            </button>
          </Link>
          <button type="submit" className="mainFont buttonReverse">
            <div className="buttonContentWrapper">
              <Check width="16" height="16" alt="Check Icon" />
              <span className="buttonFont">Save</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
