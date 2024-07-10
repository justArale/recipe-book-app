import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import LoginForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import addIcon from "../assets/addWhite.svg";
import logo from "../assets/logo.svg";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar({
  isOverlayOpen,
  handleLoginClick,
  handleCloseOverlay,
  isLogin,
  setIsLogin,
}) {
  const location = useLocation();
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/user/recipes/new");
    } else {
      handleLoginClick();
    }
  };

  return (
    <div className="header">
      <div className="inner">
        <div className="nav-title">
          <div className="logoWrapper">
            <img src={logo} alt="logo" className="logoImage" />
          </div>
          <Link to={`/`} className="noUnderline">
            <h1 className="title boldWeigth primaryColor">Bento Book</h1>

            <p className="mainFont semiBoldWeigth thirdColor">
              All my favorite recipes
            </p>
          </Link>
        </div>
        <div className="navigation">
          <div className="sidebar-path">
            <Link className="primaryColor noUnderline" to={`/`}>
              <p
                className={`mainFont semiBoldWeigth thirdColor home ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </p>
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="sidebar-path">
              <Link
                className="primaryColor noUnderline"
                to={`/user/${user._id}`}
              >
                <p
                  className={`mainFont semiBoldWeigth thirdColor profil ${
                    location.pathname === `/user/${user._id}` ||
                    location.pathname === `/user/${user._id}/edit`
                      ? "active"
                      : ""
                  }`}
                >
                  Profil
                </p>
              </Link>
            </div>
          ) : (
            <div className="sidebar-path">
              <Link className="primaryColor noUnderline" to={`/about`}>
                <p
                  className={`mainFont semiBoldWeigth thirdColor about ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  About
                </p>
              </Link>
            </div>
          )}

          <div className="action">
            <div>
              <button
                className="mainFont noUnderline primaryColor buttonReverse"
                onClick={handleButtonClick}
              >
                <div className="buttonContentWrapper">
                  <div className="iconWrapper">
                    <img src={addIcon} alt="Icon" />
                  </div>
                  <span className="buttonFont buttonFontReverse">Recipe</span>
                </div>
              </button>
            </div>
            {isLoggedIn ? (
              <div>
                <button
                  onClick={logOutUser}
                  className="mainFont noUnderline primaryColor"
                >
                  <span className="buttonFont">Log Out</span>
                </button>
              </div>
            ) : (
              <>
                {location.pathname !== "/login" &&
                  location.pathname !== "/signup" && (
                    <>
                      <button
                        onClick={handleLoginClick}
                        className="mainFont noUnderline primaryColor"
                      >
                        <span className="buttonFont">Log In</span>
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
