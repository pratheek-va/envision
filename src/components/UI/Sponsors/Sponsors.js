import React from "react";
import "./Sponsors.css";

const Sponsors = () => {
  return (
    <div class="container py-4">
      <div class="news">
        <figure class="article">
          <img src={require("../../../img/logo.png")} />

          <figcaption>
            <h3>Coin DCX</h3>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <a href="" className="sponsor-website">
              Visit Site
            </a>
          </figcaption>
        </figure>
        <figure class="article">
          <img src={require("../../../img/logo.png")} />

          <figcaption>
            <h3>Coin DCX</h3>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <a href="" className="sponsor-website">
              Visit Site
            </a>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default Sponsors;
