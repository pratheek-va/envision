import React from "react";
import { NavLink } from "react-router-dom";
import "./DepartmentCard.css";

const DepartmentCard = (props) => {
  return (
    <div className="col-md-4 g-5">
      <div className="card  department-card">
        <img
          className="card-img-top"
          src={require(`../../img/${props.image}`)}
          alt="Card image cap"
        />
        <div className="card-body department-details">
          <h5 className="card-title department-title">{props.name}</h5>
          <NavLink className="department-button" to={`/events/${props.code}`}>
            Go to Events
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
