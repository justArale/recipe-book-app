import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import NewRecipePage from "./pages/NewRecipePage";
import EditPage from "./pages/EditPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/recipes/:recipeId" element={<ItemDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/new-recipe" element={<NewRecipePage />} /> */}
        <Route path="/newrecipe" element={<NewRecipePage />} />
        {/* <Route path="/edit-recipe/:recipeId" element={<EditPage />} /> */}
        <Route path="/editrecipe/:recipeId" element={<EditPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Sidebar />
      <Footer />
    </>
  );
}

export default App;

// /recipes
// /recipes/new
// /recipes/:recipeId
// /recipes/edit/:recipeId
