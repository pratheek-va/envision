import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-center text-white app-footer">
      <div className="container p-4 app-footer-detail">
        <NavLink to="developerteam">Made with Envision Technical team</NavLink>
      </div>

      <div className="text-center p-3 copyright">
        <NavLink to="/contactus" className={"pp"}>
          Contact us
        </NavLink>{" "}
        |
        <NavLink to="/privacy-policy" className={"pp"}>
          Privacy Policy{" "}
        </NavLink>{" "}
        |
        <NavLink to="tandconditions" className="tc">
          Terms and Conditions{" "}
        </NavLink>{" "}
        |
        <a className="text-white" href="">
          © Envision 2022
        </a>
      </div>
    </footer>
  );
};

export default Footer;
