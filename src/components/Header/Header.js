import React, { useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import MaterialIcon from 'material-icons-react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const Header = (props) => {
  const [state, setStateData] = useState({search: ''});
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);

  const onSearchApplied = (e) => {
    props.setSearch(e.target.value);
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", token: user.uid, email: user.email });
      } else {
        dispatch({ type: "LOGOUT", token: "", email: "" });
      }
    });
  });

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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const unCheck = () => {
    document.getElementById("nav-checkbox").checked = false;
  };

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch({ type: "LOGOUT", token: "", email: "" });
  };

  const createEvent = async (formData, eventId) => {
    await axios.post(`https://envision-sfxf.onrender.com/api/v1/events`, formData);
    dispatch({type: 'FORM_CLOSE'});
  };

  const createEventModal = () => {
    dispatch({ type: 'FORM_OPEN', onClick: createEvent});
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
            <NavLink
              activeClassName="active"
              to="/home"
              onClick={unCheck}
              exact
            >
              <div className="link-item">Home</div>
            </NavLink>
          </li>
          <li className="nav-bar">
            <NavLink
              activeClassName="active"
              to="/events"
              onClick={unCheck}
              exact
            >
              <div className="link-item">Events</div>
            </NavLink>
          </li>

          <li className="nav-bar">
            <NavLink
              activeClassName="active"
              onClick={unCheck}
              to="/gallery"
              exact
            >
              <div className="link-item">Gallery</div>
            </NavLink>
          </li>

          <li className="nav-bar">
            <NavLink
              activeClassName="active"
              to="/sponsors"
              onClick={unCheck}
              exact
            >
              <div className="link-item">Sponsors</div>
            </NavLink>
          </li>
          <li className="nav-bar">
            <NavLink
              activeClassName="active"
              to="/aboutus"
              onClick={unCheck}
              exact
            >
              <div className="link-item">About us</div>
            </NavLink>
          </li>
          {email === 'pratheekvaberike@gmail.com' && <li className="nav-bar">
            <NavLink
              activeClassName="active"
              to="/admin"
              onClick={unCheck}
              exact
            >
              <div className="link-item">Admin</div>
            </NavLink>
          </li>}
          <li className="nav-bar">
            <input type='search' placeholder="Search Event" onChange={onSearchApplied} style={{padding: '0.2rem', fontWeight: 'bold'}}/>
          </li>
        </ul>
      </div>

      {(!token && (
        <div className="signin-header">
          <button onClick={signInHandler}>Sign In With Google</button>
        </div>
      )) || (
        email === 'pratheekvaberike@gmail.com' && <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}><div style={{ cursor: 'pointer', marginRight: '2rem' }} className="signin-header">
          <MaterialIcon icon={"add"} color="white" onClick={createEventModal}/>
        </div>
        <div className="signin-header">
          <button onClick={logoutHandler}>Log out</button>
        </div></div>
      )}
    </div>
  );
};

export default Header;
