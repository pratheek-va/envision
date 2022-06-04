import React from "react";
import "./AdminPage.css";

import CSDetails from "../Details/csdetails";
import ISDetails from "../Details/ise_aimldetails";

const departments = [
  "Computer Science",
  "ISE and AIML",
  "EC and EEE",
  "Mechanical and Marine",
  "Automobile and Aeronautical",
  "Cultural",
  "Sports",
  "Architecture",
];

const AdminPage = () => {
  return (
    <React.Fragment>
      <div class="title">
        <h2>Admin View</h2>
      </div>

      <label for="cars">Choose your department</label>

      <select id="cars">
        <option value="cs">Computer Science</option>
        <option value="ee">EEE and EC</option>
        <option value="is">IS and AIML</option>
        <option value="aa" selected>
          Automobile and Aeronautical
        </option>
        <option value="ar" selected>
          Architecture
        </option>
        <option value="cu" selected>
          Cultural
        </option>
        <option value="sr" selected>
          Cultural
        </option>
      </select>
    </React.Fragment>
  );
};

export default AdminPage;
