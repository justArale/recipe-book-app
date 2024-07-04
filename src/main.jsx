import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { IndexWrapper } from "./context/index.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <IndexWrapper>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </IndexWrapper>
    </Router>
  </React.StrictMode>
);
