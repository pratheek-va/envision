import React, { useEffect } from "react";
import "./Home.css";
import app from "../../../Firebase/firebase";

import { gsap, Expo, Power3 } from "gsap";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const signInHandler = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = result.user.uid;
        const email = result.user.email;
        console.log(token);
        dispatch({ type: "LOGIN", token, email });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid, user.email);
        dispatch({ type: "LOGIN", token: user.uid, email: user.email });
      } else {
        dispatch({ type: "LOGOUT", token: "", email: "" });
        console.log("User not signed in");
      }
    });
  });

  useEffect(() => {
    gsap.from(
      ".menu-links ul li",
      { duration: 1, opacity: 0, x: -20, ease: Power3.easeInOut },
      0.08
    );

    gsap.from(".event-desc", {
      duration: 1,
      delay: 1,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut,
    });
  }, []);

  // Set the date we're counting down to
  var countDownDate = new Date("June 15, 2022 09:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("counter").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
  return (
    <React.Fragment>
      <div className="body">
        <div className="boo"></div>
        <div className="container hei">
          <div className="content">
            <div className="content-1">
              {/* <img
                width="320"
                height="240"
                src={require("../../../img/video/en.gif")}
                type="gif"
              /> */}
              <h1 className="envision-title">
                <span className={"title-style"}>EN</span>vision'22
              </h1>
              <p className="tagline">It's time to get your game face on...</p>
              <div className="registration">
                <a href="#">Registrations are open</a>
              </div>
              <NavLink to="/events/all/Non Technical" className="event-button">
                Non Technical Events
              </NavLink>
              {(!token && (
                <div className="signin-home">
                  <button onClick={signInHandler}>Sign In With Google</button>
                </div>
              )) || (
                <div className="signin-home">
                  <button onClick={logoutHandler}>Log out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Clock></Clock> */}
      <div className="event-start">
        <h1>EVENT STARTS IN</h1>
        <p id="counter"></p>
        <h1>@</h1>
        <h1>SRINIVAS INSTITUTE OF TECHNOLOGY</h1>
      </div>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6082.206488777918!2d74.93807631036803!3d12.87379750491849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3585ea5927d6f%3A0xc65abe4f89ccf8ab!2sSrinivas%20Institute%20Of%20Technology(S.I.T.)!5e0!3m2!1sen!2sin!4v1652934773698!5m2!1sen!2sin"
          width="600"
          height="450"
          frameborder="0"
          style={{ border: 0 }}
          className="map"
          allowfullscreen
        ></iframe>
      </div>
    </React.Fragment>
  );
};

export default Home;
