// EditRecipe.jsx
// import "./EditRecipe.css";
import AddRecipe from "../components/AddRecipe";
import recipesData from "../components/recipes.json";
import { useParams } from "react-router-dom";

function EditPage() {
  const { recipeId } = useParams();
  const recipe = recipesData.find((rec) => rec.Id === recipeId);

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
