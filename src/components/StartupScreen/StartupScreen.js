import React, { useEffect } from "react";
import { useHistory } from "react-router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

const StartupScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({ type: "LOGIN", token: user.uid, email: user.email });
    } else {
      dispatch({ type: "LOGOUT", token: "", email: "" });
    }
  });

  history.push("/home");

  return <div></div>;
};

export default StartupScreen;
