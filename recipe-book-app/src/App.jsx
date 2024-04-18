import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import List from "./components/List";

function App() {
  return (
    <>
      <Navbar />
      <List />
      <Sidebar />
      <Footer />
    </>
  );
}

export default App;
