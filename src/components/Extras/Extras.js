import React from "react";
import { useParams } from "react-router-dom";

import CulDetails from "../../Details/culturaldetails";
import archidetails from "../../Details/archidetails";

import EventCard from "../EventCard/EventCard";

const Extras = () => {
  let events = [];
  const eventsArray = [];

  const params = useParams();

  const { extra } = params;
  console.log(extra);

  if (extra === "CUL") {
    for (let i = 0; i < CulDetails.length; i++) {
      events[i] = CulDetails[i];
    }
  } else if (extra === "SPORTS") {
    for (let i = 0; i < archidetails.length; i++) {
      events[i] = archidetails[i];
    }
  } else if (extra === "SSA") {
    for (let i = 0; i < archidetails.length; i++) {
      events[i] = archidetails[i];
    }
  }

  function splitArray(array, part) {
    for (var i = 0; i < array.length; i += part) {
      eventsArray.push(array.slice(i, i + part));
    }
  }

  splitArray(events, 3);

  console.log(eventsArray);

  return (
    <React.Fragment>
      <div class="container px-5 event-card-container">
        {eventsArray.map((row) => {
          return (
            <div className="row">
              {row.map((item) => (
                <EventCard
                  name={item.name}
                  venue={item.venue}
                  rules={item.rules}
                  orgname={item.orgname}
                  orgno={item.orgno}
                  image={item.image}
                  rounds={item.rounds ? item.rounds : false}
                ></EventCard>
              ))}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Extras;
