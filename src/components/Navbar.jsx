import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import LoginForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar({
  isOverlayOpen,
  handleLoginClick,
  handleCloseOverlay,
  isLogin,
  setIsLogin,
}) {
  const location = useLocation();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="inner">
        <div className="nav-title">
          <Link to={`/`} className="noUnderline">
            <h1 className="headline boldWeight primaryColor">Recipe Book</h1>
          </Link>
          <p className="body">This is my awesome list of recipes.</p>
        </div>
        <div className="navigation">
          <div className="sidebar-path">
            <Link
              className={`primaryColor noUnderline home ${
                location.pathname === "/" ? "active" : ""
              }`}
              to={`/`}
            >
              <p>Home</p>
            </Link>
          </div>
          <div className="sidebar-path">
            <Link
              className={`primaryColor noUnderline about ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to={`/about`}
            >
              <p>About</p>
            </Link>
          </div>

          <div>
            {isLoggedIn ? (
              <div>
                <button
                  onClick={logOutUser}
                  className="body noUnderline primaryColor"
                >
                  Log Out
                </button>
                <div className="newRecipeNavigation">
                  <Link to={`/recipes/new`}>
                    <button className="body noUnderline primaryColor">
                      New recipe
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {location.pathname !== "/login" &&
                  location.pathname !== "/signup" && (
                    <>
                      <button
                        onClick={handleLoginClick}
                        className="body noUnderline primaryColor"
                      >
                        Log In
                      </button>
                    </>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
      {isOverlayOpen && (
        <Overlay
          isLogin={isLogin}
          onClose={handleCloseOverlay}
          onSwitch={() => setIsLogin(!isLogin)}
        />
      )}
    </div>
  );
}

function Overlay({ isLogin, onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        onClose();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      name,
    };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        // After successful signup, log the user in
        const loginRequestBody = { email, password };

        axios
          .post(`${API_URL}/auth/login`, loginRequestBody)
          .then((response) => {
            storeToken(response.data.authToken);
            authenticateUser();
            onClose();
            navigate("/");
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="overlay">
      <div className="overlay-background" onClick={onClose}></div>
      <div className="overlay-content">
        {isLogin ? (
          <LoginForm
            handleLoginSubmit={handleLoginSubmit}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
            email={email}
            password={password}
            errorMessage={errorMessage}
            onSwitch={onSwitch}
          />
        ) : (
          <SignUpForm
            handleSignupSubmit={handleSignupSubmit}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
            handleName={handleName}
            email={email}
            password={password}
            name={name}
            errorMessage={errorMessage}
            onSwitch={onSwitch}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;

{
  /* <Link to={`/${to}`}>
  <button className="my-button">Take me to {to === "" ? "home" : to}</button>
</Link>; */
}
