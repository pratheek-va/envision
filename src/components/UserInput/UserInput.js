import React from "react";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isCollege = (value) => value.trim() !== "";
const isPhoneNumber = (value) => {
  const phoneno = /^\d{10}$/;
  if (value.match(phoneno)) {
    return true;
  } else return false;
};
const isUsn = (value) => (value) => value.trim() !== "";

const UserInput = () => {
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
    valueChangeHandler: collegeChangeHandler,
    inputBlurHandler: collegeBlurHandler,
    reset: resetCollege,
  } = useInput(isCollege);

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    valueChangeHandler: phoneNumberHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(isPhoneNumber);

  const {
    value: usn,
    isValid: usnIsValid,
    valueChangeHandler: usnChangeHandler,
    inputBlurHandler: usnBlurHandler,
    reset: resetUsn,
  } = useInput(isUsn);
  return (
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
            {!nameIsValid && <p style={"color:red"}>Enter the valid input</p>}
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
            {phon && <p style={"color:red"}>Enter the valid input</p>}
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
            {!collegeIsValid && (
              <p style={"color:red"}>Enter the valid input</p>
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
            {!usnIsValid && <p style={"color:red"}>Enter the valid input</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserInput;
