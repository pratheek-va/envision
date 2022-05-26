import React, { useCallback } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import shortid from "shortid";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import app from "../../Firebase/firebase";

const Header = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  console.log(token);

  const signInHandler = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const name = result.user.displayName;
        const email = result.user.email;
        dispatch({ type: "LOGIN", token, name, email });
        localStorage.setItem("creds", JSON.stringify({ token, email, name }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT", token: "", name: "", email: "" });
    localStorage.removeItem("creds");
  };

  return (
    <div class="nav">
      <div className="logo">
        <img src={require("../../img/envisionlogo.png")} />
      </div>

      <input type="checkbox" id="nav-checkbox" />
      <label for="nav-checkbox" className="cart menu-icon">
        <ion-icon name="menu-sharp"></ion-icon>
      </label>
      <label for="nav-checkbox" className="cart close-icon">
        <ion-icon name="close-sharp"></ion-icon>
      </label>

      <div className="menu-links">
        <ul>
          <li className="nav-bar">
            <NavLink activeClassName="active" to="/home" exact>
              <div className="link-item">Home</div>
            </NavLink>
          </li>
          <li className="nav-bar">
            <NavLink activeClassName="active" to="/events" exact>
              <div className="link-item">Events</div>
            </NavLink>
          </li>
          <li className="nav-bar">
            <NavLink activeClassName="active" to="/gallery" exact>
              <div className="link-item">Gallery</div>
            </NavLink>
          </li>
          {/* <li className="nav-bar">
            <NavLink activeClassName="active" to="/sponsors" exact>
              <div className="link-item">Sponsors</div>
            </NavLink>
          </li> */}
          <li className="nav-bar">
            <NavLink activeClassName="active" to="/aboutus" exact>
              <div className="link-item">About us</div>
            </NavLink>
          </li>
        </ul>
      </div>

      {(!token && (
        <div className="signin-header">
          <button onClick={signInHandler}>Sign In With Google</button>
        </div>
      )) || (
        <div className="signin-header">
          <button onClick={logoutHandler}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
