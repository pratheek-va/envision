import React from "react";
import "./Sponsors.css";

const Sponsors = () => {
  return (
    <div class="container py-4 event-card-container">
      <div class="news">
        <figure className="article">
          <img src={require("../../../img/skillhouse.png")} />

          <figcaption className="sponsor-text">
            <h3>Skillhouse</h3>

            <p>
              Skillhouse is a virtual learning space that brings together
              engineering students and top industry experts. We help students
              acquire industry-level technical skills alongside their graduation
              course to create better developers for the future.
            </p>
            <a href="https://www.skill-house.com/" className="sponsor-website">
              Visit Site
            </a>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default Sponsors;
