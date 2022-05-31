import React from "react";
import AboutUsCard from "../../AboutUsCard/AboutUsCard";
import "./Aboutus.css";

import orgDetails from "../../../Details/orgdetails";

const orgArray = [];

function splitArray(array, part) {
  for (var i = 0; i < array.length; i += part) {
    orgArray.push(array.slice(i, i + part));
  }
}

splitArray(orgDetails, 4);

const Aboutus = () => {
  return (
    <React.Fragment>
      <div className="container py-4">
        {orgArray.map((row) => {
          return (
            <div className="row gx-5">
              {row.map((organizer) => {
                return (
                  <AboutUsCard
                    name={organizer.name}
                    role={organizer.role}
                    image={organizer.image}
                    phone={organizer.phno}
                    email={organizer.email}
                  ></AboutUsCard>
                );
              })}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Aboutus;
