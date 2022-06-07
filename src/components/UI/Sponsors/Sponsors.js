import React from "react";
import "./Sponsors.css";

import sponsors from "./../../../Details/sponsors";

const Sponsors = () => {
  return (
    <div class="container py-4 event-card-container">
      {sponsors.map((sponsor) => {
        return (
          <div class="news">
            <figure className="article">
              <img src={require(`../../../img/${sponsor.image}`)} />

              <figcaption className="sponsor-text">
                <h3>{sponsor.name}</h3>

                <p>{sponsor.details}</p>
                <a href={sponsor.link} className="sponsor-website">
                  Visit Site
                </a>
              </figcaption>
            </figure>
          </div>
        );
      })}
    </div>
  );
};

export default Sponsors;
