import React from "react";
import { useSelector } from "react-redux";
import useInput from "../../hooks/use-input";
import { useDispatch } from "react-redux";
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

const Input = () => {
  const name = useSelector((state) => state.detail.name);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const venue = useSelector((state) => state.detail.venue);
  const key = useSelector((state) => state.detail.key);

  const dispatch = useDispatch();

  const closeDetails = () => {
    dispatch({ type: "CLOSE" });
  };

  const resetFields = () => {
    resetName();
    resetPhoneNumber();
    resetCollege();
    resetUsn();
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

  const displayPayment = () => {
    if (!nameIsValid || !phoneNumberIsValid || !usnIsValid || !collegeIsValid)
      return;
    displayRazorPay(
      nameValue,
      email,
      college,
      phoneNumber,
      100,
      usn,
      name,
      venue,
      key
    );
  };

  return (
    <div className="event-detail-modal">
      <div className="app-modal-content" data-aos="zoom-in">
        <div className="app-modal-title">
          <h5>{name}</h5>
        </div>
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
                USN/Reg.No
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
          <h4 style={{ marginTop: "20px" }}>
            Takes couple of seconds for payment popup
          </h4>
        </div>
        <div className="app-modal-footer">
          <button
            type="button"
            className="app-modal-close"
            onClick={closeDetails}
          >
            Close
          </button>
          {token && (
            <button className="app-modal-register" onClick={displayPayment}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
