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
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const { recipeId } = useParams();
  let navigate = useNavigate();
  // const [recipes, setRecipes] = useState(
  //   JSON.parse(localStorage.getItem("recipes")) || []
  // );

  // useEffect(() => {
  //   const storedRecipes = localStorage.getItem("recipes");
  //   if (storedRecipes) {
  //     try {
  //       setRecipes(JSON.parse(storedRecipes));
  //     } catch (error) {
  //       console.error("Error parsing recipes from localStorage:", error);
  //     }
  //   } else {
  //     console.log("No recipes found in localStorage.");
  //   }
  // }, []);

  // const fetchUserData = async () => {
  //   const storedToken = localStorage.getItem("authToken");
  //   try {
  //     const response = await axios.get(`${API_URL}/api/user/${user._id}`, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     });
  //     setCurrentUser(response.data);
  //   } catch (error) {
  //     const errorDescription =
  //       error.response?.data?.message || "An error occurred";
  //     setErrorMessage(errorDescription);
  //   }
  // };

  // useEffect(() => {
  //   if (user && user._id) {
  //     fetchUserData();
  //   }
  // }, [user]);

  // const [Name, setName] = useState(existingRecipe?.name || "");
  // const [Description, setDescription] = useState(
  //   existingRecipe?.description || ""
  // );
  // const [img, setImg] = useState(existingRecipe?.image || "");

  // // Map over Ingredient to get the value of amount and name because there are nested Objects in an Array
  // const [amount, setAmount] = useState(
  //   existingRecipe?.ingredients.map((ingre) => ingre.amount) || [""]
  // );

  // const [ingredient, setIngredient] = useState(
  //   existingRecipe?.ingredients.map((ingre) => ingre.name) || [""]
  // );
  // const [Instruction, setInstruction] = useState(
  //   existingRecipe?.instruction || [""]
  // );

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
  const [Instruction, setInstruction] = useState(
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

  const handleFileUpload = async (file) => {
    try {
      setIsLoading(true);
      const fileUrl = await fileUploadService.uploadRecipeImage(file);
      setIsLoading(false);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading option image:", error);
      setIsLoading(false);
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
    const updatedInstructions = [...Instruction];
    updatedInstructions[index] = e.target.value;
    setInstruction(updatedInstructions);
  };

  function updateRecipe(updatedRecipe) {
    const updatedRecipes = recipes.map((rec) =>
      rec.Id === updatedRecipe.Id ? updatedRecipe : rec
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  }

  function addNewRecipe(newRecipe) {
    const updatedRecipeList = [...recipes, newRecipe];
    setRecipes(updatedRecipeList);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipeList));
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const updatedRecipe = {
  //     Id: recipeId || Date.now().toString(), // Use timestamp if no recipeId provided
  //     Name,
  //     Description,
  //     img,
  //     Ingredients: ingredient
  //       .map((name, index) => ({ amount: amount[index], name: name }))
  //       .filter((ing) => ing.name.trim() !== ""), // Remove empty ingredient row
  //     Instruction: Instruction.filter((instr) => instr.trim() !== ""), // Remove empty instruction row
  //   };

  //   if (recipeId) {
  //     updateRecipe(updatedRecipe);
  //   } else {
  //     addNewRecipe(updatedRecipe);
  //   }
  //   // back to homepage
  //   navigate("/");
  //   // jump to the top
  //   window.scrollTo(0, 0);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    try {
      if (recipeId) {
        // Rezept aktualisieren
        const recipeResponse = await axios.put(
          `${API_URL}/api/user/${authorId}/recipes/${recipeId}`,
          {
            name: Name,
            image: img,
            description: Description,
            ingredients: ingredient
              .map((name, index) => ({ amount: amount[index], name: name }))
              .filter((ing) => ing.name.trim() !== ""), // Entfernen Sie leere Zutatenzeilen
            Instruction: Instruction.filter((instr) => instr.trim() !== ""), // Entfernen Sie leere Anweisungszeilen
            author: user,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log("Recipe changed successfully:", recipeResponse.data); // Debugging log
      } else {
        // Neues Rezept erstellen
        const recipeResponse = await axios.post(
          `${API_URL}/api/user/${currentUser._id}/recipes`,
          {
            name: Name,
            image: img,
            description: Description,
            ingredients: ingredient
              .map((name, index) => ({ amount: amount[index], name: name }))
              .filter((ing) => ing.name.trim() !== ""), // Entfernen Sie leere Zutatenzeilen
            Instruction: Instruction.filter((instr) => instr.trim() !== ""), // Entfernen Sie leere Anweisungszeilen
            author: user,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log("Recipe created successfully:", recipeResponse.data); // Debugging log
      }
      // Zurück zur Startseite navigieren
      if (recipeId) {
        navigate(`/user/${authorId}/recipes/${recipeId}`);
      } else {
        navigate("/");
      }
      // Zum Seitenanfang springen
      window.scrollTo(0, 0);
    } catch (error) {
      console.log("Error creating or updating recipe:", error); // Debugging log
      const errorDescription =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

  const addNewField = () => {
    setInstruction([...Instruction, ""]);
  };

  const addNewIngredient = () => {
    setAmount([...amount, ""]);
    setIngredient([...ingredient, ""]);
  };

  // useEffect(() => {
  //   // Update local storage whenever recipes state changes
  //   localStorage.setItem("recipes", JSON.stringify(recipes));
  // }, [recipes]);

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
                <input type="file" name="img" onChange={handleFileUpload} />
                {img ? "🖼️ Change Image" : "🖼️ Choose Image"}
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
