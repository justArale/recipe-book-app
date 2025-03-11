// EditRecipe.jsx
import AddRecipe from "../components/AddRecipe";
import { useLocation } from "react-router-dom";

function EditPage() {
  const location = useLocation();
  const recipeFromLocation = location.state?.currentRecipe;

  return (
    <>
      <AddRecipe existingRecipe={recipeFromLocation} />
    </>
  );
}

export default EditPage;
