import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcon from 'material-icons-react';
import axios from "axios";

import "./EventCard.css";

const EventCard = (props) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

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
      venue: props.venue,
      regfee: props.regfee,
      fee: props.fee,
      details: props.details,
      key: props.rpkey,
    });
  };

  const deleteEvent = async (eventId) => {
    await axios.delete(`https://envision-sfxf.onrender.com/api/v1/events/${eventId}`);
    dispatch({ type: 'CONFIRM_CLOSE' });
    props.fetchEvents();
  }

  const updateEvent = async (formData, eventId) => {
    await axios.patch(`https://envision-sfxf.onrender.com/api/v1/events/${eventId}`, formData);
    dispatch({type: 'FORM_CLOSE'});
    props.fetchEvents();
  }

  const updateFormModal = () => {
    dispatch({ type: 'FORM_OPEN', id: props.id, onClick: updateEvent});
  }

  const deleteConfirmModal = () => {
    dispatch({ type: 'CONFIRM', id: props.id, title: 'Delete Event', onClick: deleteEvent, confirmationText: 'Do you want to delete this event'});
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
        <img className="card-img-top" src={require(`../../img/${props.image}`)} alt='card'/>
        <div className="card-body card-details">
          {email === 'pratheekvaberike@gmail.com' && <div className="button-container">
            <div style={{cursor: 'pointer'}}>
              <MaterialIcon icon={"delete"} color="red" onClick={deleteConfirmModal}/>
            </div>
            <div style={{cursor: 'pointer'}}>
              <MaterialIcon icon={"edit"} onClick={updateFormModal} color="#fff"/>
            </div>
          </div>}
          <h5 className="card-title event-title">{props.name}</h5>
          <p>Venue: {props.venue}</p>
          <p className="date-time">
            <span>
              {props.date} | {props.time}
            </span>
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
