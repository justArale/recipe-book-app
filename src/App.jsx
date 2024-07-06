import "./App.css";
import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import NewRecipePage from "./pages/NewRecipePage";
import EditPage from "./pages/EditPage";
import UserEditPage from "./pages/UserEditPage";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import IsPrivate from "./components/IsPrivate";
import UserPage from "./pages/UserPage";

function App() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div className="page">
      <Navbar
        isOverlayOpen={isOverlayOpen}
        handleLoginClick={handleLoginClick}
        handleCloseOverlay={handleCloseOverlay}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user/:authorId" element={<UserPage />} />

        <Route
          path="/user/:authorId/recipes/:recipeId"
          element={<ItemDetailsPage />}
        />

        <Route
          path="/user/:authorId/edit"
          element={
            <IsPrivate>
              <UserEditPage />
            </IsPrivate>
          }
        />
        <Route
          path="/user/recipes/new"
          element={
            <IsPrivate>
              <NewRecipePage />
            </IsPrivate>
          }
        />
        <Route
          path="/user/:authorId/recipes/edit/:recipeId"
          element={
            <IsPrivate>
              <EditPage />
            </IsPrivate>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* <Sidebar /> */}
      <Footer />
    </div>
  );
}

export default App;
