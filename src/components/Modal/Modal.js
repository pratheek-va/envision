import React from "react";
import "./Modal.css";
import { useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();
  const closeWarning = () => {
    dispatch({ type: "CLOSE-W" });
  };
  return (
    <div className="warning-modal">
      <div>
        <p className="warning-modal-text">Please Sign In to register</p>
        <p className="warning-modal-text">Go to Home page to sign in</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {window.location.pathname != "/home" && (
            <div className={"warning-modal-link"}>
              <NavLink
                to="/home"
                activeClassName="active"
                onClick={closeWarning}
                exact
              >
                Go Home
              </NavLink>
            </div>
          )}
          <button
            style={{ marginLeft: "1rem" }}
            type="button"
            className="app-modal-close"
            onClick={closeWarning}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
