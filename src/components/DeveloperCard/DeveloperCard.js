import React from "react";
import "./DeveloperCard.css";

const DeveloperCard = (props) => {
  return (
    <div className="col-md-3 g-5">
      <div
        className="card developer-card"
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
            <a href="#" className="media insta">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a className="media whatsapp" href="#">
              <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
            <a className="media email" href="#">
              <ion-icon name="mail-outline"></ion-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
