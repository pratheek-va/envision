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
        {/* <div>
          <p className="aboutus-text">ABOUT US</p>
          <p className="aboutus-para">
            Envision is all about the competitive spirit. Providing a platform
            for the exhibition of utmost creativity.
          </p>
        </div> */}
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
