// EditRecipe.jsx
import AddRecipe from "../components/AddRecipe";
import recipesData from "../components/recipes.json";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function EditPage() {
  const { authorId, recipeId } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/user/${authorId}/recipes/${recipeId}`
      );
      setCurrentRecipe(response.data);
      console.log("Recipe: ", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
      const errorDescription =
        error.response?.data?.message ||
        "An error occurred while fetching recipe data";
      setErrorMessage(errorDescription);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeData();
  }, []);

  // const [recipes, setRecipes] = useState(
  //   JSON.parse(localStorage.getItem("recipes")) || recipesData
  // );

  // const localRecipes = JSON.parse(localStorage.getItem("recipes"));
  // // first spread the localRecipes, because .find takes the first matching id it finds
  // const allRecipes = [...localRecipes, ...recipesData];
  // const recipe = allRecipes.find((rec) => rec.Id === recipeId);

  // unnötig, eventuell aber für outsourcen AddRecipe
  // useEffect(() => {
  // Update local storage whenever recipes state changes
  //   localStorage.setItem("recipes", JSON.stringify(recipes));
  // }, [recipes]);

  return (
    <>
      <AddRecipe existingRecipe={currentRecipe} />
    </>
  );
}

export default EditPage;

//___________________________________________

// // with then
// const fetchSomething = () => {
//     fetch( "code")
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }
//___________________________________________

// // with async await
// const fetchSomething = async () => {
//     const response = await fetch("code");
//     const data = await response.json()
//     return(data)
// }

// console.log(fetchSomething())

//___________________________________________

// const [something, setSomething] = useState({});

// const fetchSomething = async () => {
//   const response = await fetch("code");
//   const data = await response.json();
//   setSomething(data);
// };

// useEffect(() => {
//     fetchSomething()
// },[justPassPrimitiveDatatType])  => with useEffect you don't need a button to call

// <button onClick={fetchSomething()}>Click for call</button>;
// console.log(fetchSomething());
// return <>{something.somethingSpecific}</>;
