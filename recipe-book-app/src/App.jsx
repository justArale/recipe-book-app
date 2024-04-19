import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import List from "./components/List";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<List />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Sidebar />
      <Footer />
    </>
  );
}

export default App;
