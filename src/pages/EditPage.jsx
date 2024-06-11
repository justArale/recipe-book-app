// EditRecipe.jsx
import AddRecipe from "../components/AddRecipe";
import recipesData from "../components/recipes.json";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditPage() {
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || recipesData
  );

  const localRecipes = JSON.parse(localStorage.getItem("recipes"));
  // first spread the localRecipes, because .find takes the first matching id it finds
  const allRecipes = [...localRecipes, ...recipesData];
  const recipe = allRecipes.find((rec) => rec.Id === recipeId);

  // unnötig, eventuell aber für outsourcen AddRecipe
  useEffect(() => {
    // Update local storage whenever recipes state changes
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <>
      <AddRecipe existingRecipe={recipe} />
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
