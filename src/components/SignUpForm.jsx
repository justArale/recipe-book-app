import React, { useEffect, useRef } from "react";
import "./LogInForm.css";

const SignUpForm = ({
  handleSignupSubmit,
  handleEmail,
  handlePassword,
  handleName,

  email,
  password,
  name,

  errorMessage,
  onSwitch,
}) => {
  return (
    <div className="sign-up">
      <form onSubmit={handleSignupSubmit} className="signup-form">
        <h3 className="sectionTitle">Sign Up</h3>
        <div className="input-group">
          <label htmlFor="name" className="label secondaryColor">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            autoComplete="off"
            className="signUpInput"
            placeholder="What's your name?"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email" className="label secondaryColor">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            autoComplete="off"
            className="signUpInput"
            placeholder="What's your email?"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="label secondaryColor">
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

        <button
          type="submit"
          className="button buttonPrimaryLarge buttonFont buttonFontReverse"
        >
          Create Account
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="bodyLink">
        Already have an account?{" "}
        <a href="#" onClick={onSwitch}>
          Log In
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
