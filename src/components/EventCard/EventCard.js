import React from "react";
import "./EventCard.css";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const EventCard = (props) => {
  const dispatch = useDispatch();

  const showDetails = () => {
    dispatch({ type: "SHOW" });
    dispatch({
      type: "SEND",
      rules: props.rules,
      orgname: props.orgname,
      orgno: props.orgno,
      image: props.image,
      name: props.name,
      rounds: props.rounds,
    });
  };

  return (
    <div
      className="col-md-4 px-5 gy-5"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="300"
      data-aos-offset="0"
    >
      <div className="card event-card">
        <img
          className="card-img-top"
          src={require(`../../img/${props.image}`)}
          alt="Card image cap"
        />
        <div className="card-body card-details">
          <h5 className="card-title event-title">{props.name}</h5>
          <p>Venue: {props.venue}</p>
          <p className="date-time">
            <span>13/4/22</span>
          </p>
          <button className="event-button" onClick={showDetails}>
            Know more
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
