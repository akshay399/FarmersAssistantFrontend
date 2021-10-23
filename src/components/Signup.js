import React from "react";
import useStyles from './newsStyles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './signup.css'



const Signup = (props) => {
  const classes = useStyles();
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <>
    <div className={classes.toolbar} />
            {/* <div className={classes.toolbar} /> */}
    <section className="login">
      <div className="loginContainer">
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <Link to="/dashboard"><button className="loginButton button2" onClick={handleLogin}>Sign In</button></Link>
              <p>
                Don't have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
             <Link to="/dashboard"> <button className="loginButton button2" onClick={handleSignup}>Sign Up</button></Link>
              <p>
                Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default Signup;