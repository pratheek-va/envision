import React from "react";
import "./AboutUsCard.css";

const AboutUsCard = (props) => {
  return (
    <div className="col-md-3 g-5">
      <div
        className="card about-us-card"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <img
          src={require(`../../img/${props.image}`)}
          className="img card-img-top"
          alt=""
        />
        <h5 className="person-name">{props.name}</h5>
        <div className="person-info">
          <p>{props.role}</p>

          <div className="divMedia">
            <a href={`tel:${props.phone}`} className="media phone">
              <ion-icon name="call-outline"></ion-icon>
            </a>
            <a className="media mail" href={`mailto:${props.email}`}>
              <ion-icon name="mail-outline"></ion-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
