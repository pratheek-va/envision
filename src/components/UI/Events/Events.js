import React, { useState } from "react";
import "./Events.css";

import EventCard from "../../EventCard/EventCard";

import { useParams } from "react-router";

import CSDetails from "../../../Details/csdetails";
import AUDetails from "../../../Details/audetails";
import EEDetails from "../../../Details/ece_eeedetails";
import ISDetails from "../../../Details/ise_aimldetails";
import MMDetails from "../../../Details/mech_marinedetails";
import CulDetails from "../../../Details/culturaldetails";

const allDetails = [
  ...CSDetails,
  ...AUDetails,
  ...EEDetails,
  ...ISDetails,
  ...MMDetails,
];

const Events = () => {
  const params = useParams();
  const { departmentName, eventType } = params;

  let events = [];
  const eventsArray = [];

  if (departmentName === "CS" && eventType === "Technical") {
    let k = 0;
    for (let i = 0; i < CSDetails.length; i++) {
      if (CSDetails[i].type === "T") {
        events[k] = CSDetails[i];
        k++;
      }
    }
  } else if (departmentName === "CS" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < CSDetails.length; i++) {
      if (CSDetails[i].type === "NT") {
        events[k] = CSDetails[i];
        k++;
      }
    }
  } else if (departmentName === "EE" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < EEDetails.length; i++) {
      if (EEDetails[i].type === "NT") {
        events[k] = EEDetails[i];
        k++;
      }
    }
  } else if (departmentName === "EE" && eventType === "Technical") {
    let k = 0;
    for (let i = 0; i < EEDetails.length; i++) {
      if (EEDetails[i].type === "T") {
        events[k] = EEDetails[i];
        k++;
      }
    }
  } else if (departmentName === "AU" && eventType === "Technical") {
    let k = 0;
    for (let i = 0; i < AUDetails.length; i++) {
      if (AUDetails[i].type === "T") {
        events[k] = AUDetails[i];
        k++;
      }
    }
  } else if (departmentName === "AU" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < AUDetails.length; i++) {
      if (AUDetails[i].type === "NT") {
        events[k] = AUDetails[i];
        k++;
      }
    }
  } else if (departmentName === "IS" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < ISDetails.length; i++) {
      if (ISDetails[i].type === "NT") {
        events[k] = ISDetails[i];
        k++;
      }
    }
  } else if (departmentName === "IS" && eventType === "Technical") {
    let k = 0;
    for (let i = 0; i < ISDetails.length; i++) {
      if (ISDetails[i].type === "T") {
        events[k] = ISDetails[i];
        k++;
      }
    }
  } else if (departmentName === "MM" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < MMDetails.length; i++) {
      if (MMDetails[i].type === "T") {
        events[k] = MMDetails[i];
        k++;
      }
    }
  } else if (departmentName === "MM" && eventType === "Technical") {
    let k = 0;
    for (let i = 0; i < MMDetails.length; i++) {
      if (MMDetails[i].type === "NT") {
        events[k] = MMDetails[i];
        k++;
      }
    }
  } else if (departmentName === "CUL") {
    for (let i = 0; i < CulDetails.length; i++) {
      events[i] = CulDetails[i];
    }
  } else if (departmentName === "SPO") {
    let k = 0;
    for (let i = 0; i < MMDetails.length; i++) {
      events[k] = MMDetails[i];
      k++;
    }
  } else if (departmentName === "SSA") {
    let k = 0;
    for (let i = 0; i < MMDetails.length; i++) {
      events[k] = MMDetails[i];
      k++;
    }
  } else if (departmentName === "all" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < allDetails.length; i++) {
      if (allDetails[i].type === "NT") {
        events[k] = allDetails[i];
        k++;
      }
    }
  }

  function splitArray(array, part) {
    for (var i = 0; i < array.length; i += part) {
      eventsArray.push(array.slice(i, i + part));
    }
  }

  splitArray(events, 3);
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

export default Events;
