import React, { useState } from "react";
import "./EventDetail.css";
import useInput from "../../hooks/use-input";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { displayRazorPay } from "../../payment";

const isNotEmpty = (value) => value.trim() !== "";
const isCollege = (value) => value.trim() !== "";
const isPhoneNumber = (value) => {
  const phoneno = /^\d{10}$/;
  if (value.match(phoneno)) {
    return true;
  } else return false;
};
const isUsn = (value) => (value) => value.trim() !== "";

const EventDetail = (props) => {
  let modal = true;
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  const rules = useSelector((state) => state.detail.rules);
  const orgname = useSelector((state) => state.detail.orgname);
  const orgno = useSelector((state) => state.detail.orgno);
  const eventType = useSelector((state) => state.event.eventType);
  const image = useSelector((state) => state.detail.image);
  const name = useSelector((state) => state.detail.name);
  const rounds = useSelector((state) => state.detail.rounds);
  const venue = useSelector((state) => state.detail.venue);
  const regfee = useSelector((state) => state.detail.regfee);
  const fee = useSelector((state) => state.detail.fee);
  const details = useSelector((state) => state.detail.details);
  const key = useSelector((state) => state.detail.key);

  const email = useSelector((state) => state.auth.email);

  const changeModal = () => {
    setSubmit(true);
  };

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: college,
    isValid: collegeIsValid,
    hasError: collegeHasError,
    valueChangeHandler: collegeChangeHandler,
    inputBlurHandler: collegeBlurHandler,
    reset: resetCollege,
  } = useInput(isCollege);

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    hasError: numberHasError,
    valueChangeHandler: phoneNumberHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(isPhoneNumber);

  const {
    value: usn,
    isValid: usnIsValid,
    hasError: usnHasError,
    valueChangeHandler: usnChangeHandler,
    inputBlurHandler: usnBlurHandler,
    reset: resetUsn,
  } = useInput(isUsn);

  const resetFields = () => {
    resetName();
    resetPhoneNumber();
    resetCollege();
    resetUsn();
  };

  const closeDetails = () => {
    dispatch({ type: "CLOSE" });
  };

  const displayPayment = () => {
    if (!nameIsValid || !phoneNumberIsValid || !usnIsValid || !collegeIsValid)
      return;
    displayRazorPay(
      nameValue,
      email,
      college,
      phoneNumber,
      fee,
      usn,
      name,
      venue,
      key
    );
    resetFields();
  };

  const params = useParams();
  const extra = params.extra;
  console.log(extra);
  console.log(fee, key);

  if (eventType == "TECHNICAL" || extra) {
    modal = false;
  }

  const token = useSelector((state) => state.auth.token);
  return (
    <div className="event-detail-modal">
      <div className="app-modal-content" data-aos="zoom-in">
        <div className="app-modal-title">
          <h5>{name}</h5>
        </div>
        {(!submit && (
          <div className="app-modal-body">
            <div className="modal-organizer-detail">
              <img
                src={require(`../../img/${image}`)}
                className="modal-image"
              />
              <h6>Organizer Details</h6>
              <p>{orgname}</p>
              <p>{orgno}</p>
              <p>envision@gmail.com</p>
            </div>
            {(!rounds && (
              <div className="modal-event-detail">
                <h6>Rules</h6>
                <ol>
                  {rules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ol>
                <p>{regfee}</p>
                <p>{details}</p>
              </div>
            )) || (
              <div className="modal-event-detail">
                <h6>Rules</h6>
                {rules.map((round, i) => (
                  <div>
                    {`Round${i + 1}`}
                    <ol>
                      {round.map((rule, i) => {
                        return <li key={i}>{rule}</li>;
                      })}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>
        )) || (
          <div className="app-form-modal">
            <form className="app-form">
              <div className="form-group row">
                <label
                  for="colFormLabelLg"
                  className="col-sm-2 col-form-label col-form-label-lg app-form-label"
                >
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="colFormLabelLg"
                    value={nameValue}
                    onBlur={nameBlurHandler}
                    onChange={nameChangeHandler}
                  />
                  {nameHasError && (
                    <p style={{ color: "red" }}>Enter the valid input</p>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  for="colFormLabelLg"
                  className="col-sm-2 col-form-label col-form-label-lg app-form-label"
                >
                  Phone
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="colFormLabelLg"
                    value={phoneNumber}
                    onBlur={phoneNumberBlurHandler}
                    onChange={phoneNumberHandler}
                  />
                  {numberHasError && (
                    <p style={{ color: "red" }}>Enter the valid input</p>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  for="colFormLabelLg"
                  className="col-sm-2 col-form-label col-form-label-lg app-form-label"
                >
                  College
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="colFormLabelLg"
                    value={college}
                    onBlur={collegeBlurHandler}
                    onChange={collegeChangeHandler}
                  />
                  {collegeHasError && (
                    <p style={{ color: "red" }}>Enter the valid input</p>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  for="colFormLabelLg"
                  className="col-sm-2 col-form-label col-form-label-lg app-form-label"
                >
                  USN
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="colFormLabelLg"
                    value={usn}
                    onBlur={usnBlurHandler}
                    onChange={usnChangeHandler}
                  />
                  {usnHasError && (
                    <p style={{ color: "red" }}>Enter the valid input</p>
                  )}
                </div>
              </div>
            </form>
            <h4 style={{ marginTop: "20px" }}>
              A Ticket will be sent to your email address after payment it is
              important to bring that ticket to the event
            </h4>
          </div>
        )}
        <div className="app-modal-footer">
          <button
            type="button"
            className="app-modal-close"
            onClick={closeDetails}
          >
            Close
          </button>
          {token && modal && (
            <button
              className="app-modal-register"
              onClick={!submit ? changeModal : displayPayment}
            >
              {!submit ? "Register" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
