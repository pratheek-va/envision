import React, { useState } from "react";
import "./AdminPage.css";
import Axios from "axios";

import CSDetails from "../Details/csdetails";
import ISDetails from "../Details/ise_aimldetails";
import MMDetails from "../Details/mech_marinedetails";
import AUDetails from "../Details/audetails";
import EEDetails from "../Details/ece_eeedetails";
import ADetails from "../Details/archidetails";
import CUDetails from "../Details/culturaldetails";
import SPDetails from "../Details/sportsSeniorDetails";

const registration = [];

const getRegistration = async () => {
  const response = Axios.get(
    "https://envision-d8105-default-rtdb.firebaseio.com/registration.json"
  );
  const data = await (await response).data;

  for (const i in data) {
    registration.unshift(data[i]);
  }
  console.log(registration);
};

getRegistration();

const AdminPage = () => {
  let events = [];
  const [department, setDepartment] = useState("CS");
  const [event, setEvent] = useState("");

  const departmentChangeHandler = (e) => {
    setDepartment(e.target.value);
  };

  const eventChangeHandler = (e) => {
    setEvent(e.target.value);
  };

  if (department === "CS") {
    CSDetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  } else if (department === "IS") {
    ISDetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  } else if (department === "MM") {
    MMDetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  } else if (department === "AU") {
    AUDetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  } else if (department === "EE") {
    EEDetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  } else if (department === "AR") {
    ADetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  } else if (department === "CUL") {
    CUDetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  } else if (department === "SR") {
    SPDetails.forEach((event) => {
      if (event.type === "NT") events.push(event);
    });
  }

  const registers = [];

  for (let i = 0; i < registration.length; i++) {
    if (registration[i].event === event) registers.unshift(registration[i]);
  }

  console.log(registers);

  return (
    <React.Fragment>
      <div className="container" style={{ height: "100vh" }}>
        <div class="title">
          <h2>Admin View</h2>
        </div>

        <div className="selectors">
          <select
            id="departments"
            value={department}
            onChange={departmentChangeHandler}
          >
            <option value="CS" selected>
              Computer Science
            </option>
            <option value="EE">EEE and EC</option>
            <option value="IS">IS and AIML</option>
            <option value="AU">Automobile and Aeronautical</option>
            <option value="MM">Mechanical and Marine</option>
            <option value="AR">Architecture</option>
            <option value="CUL">Cultural</option>
            <option value="SR">Sports</option>
          </select>

          <select id="events" value={event} onChange={eventChangeHandler}>
            <option value="">Select Event</option>
            <option
              value={`Technical Event/${department}`}
            >{`Technical Event/${department}`}</option>
            {events.map((event) => {
              return <option value={event.name}>{event.name}</option>;
            })}
          </select>
        </div>
        <div
          style={{
            height: "70vh",
            width: "100%",
            overflow: "auto",
            marginTop: "3rem",
          }}
        >
          <table class="table table-striped admin-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fullname</th>
                <th scope="col">USN</th>
                <th scope="col">College</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {registers.map((person, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{person.name}</td>
                  <td>{person.usn}</td>
                  <td>{person.college}</td>
                  <td>{person.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;
