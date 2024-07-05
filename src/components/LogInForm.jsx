import React from "react";
import "./LogInForm.css";

const LogInForm = ({
  handleLoginSubmit,
  handleEmail,
  handlePassword,
  email,
  password,
  errorMessage,
  onSwitch,
}) => {
  return (
    <div>
      <p className="body">
        <a href="#" onClick={onSwitch} className="noUnderline hiddenSignUp">
          Sign Up
        </a>
      </p>
      <div className="login">
        <form onSubmit={handleLoginSubmit} className="signup-form">
          <h3 className="bodyLarge">Log In</h3>

          <div className="input-group">
            <label htmlFor="email" className="body">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmail}
              autoComplete="off"
              placeholder="What's your email?"
              className="signUpInput"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="body">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
              autoComplete="off"
              placeholder="••••••••••••••••"
              className="signUpInput"
            />
          </div>

          <button type="submit" className="becomePrivateButton">
            Log In
          </button>
        </form>

        {errorMessage && <p className="body">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LogInForm;

////////
