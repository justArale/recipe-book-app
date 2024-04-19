import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
// import List from "./components/List";
import DashboardPage from "./pages/DashboardPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/recipes/:recipeId" element={<ItemDetailsPage />} />
        {/* <Route path="/students/:studentId" element={<StudentDetailsPage />} />

          <Route path="/profile" element={<UserProfilePage />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Sidebar />
      <Footer />
    </>
  );
}

export default App;
