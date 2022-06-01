import React, { useState } from "react";
import "./Events.css";
import keys from "../../../Details/key/key";

import EventCard from "../../EventCard/EventCard";

import { useParams } from "react-router";

import CSDetails from "../../../Details/csdetails";
import AUDetails from "../../../Details/audetails";
import EEDetails from "../../../Details/ece_eeedetails";
import ISDetails from "../../../Details/ise_aimldetails";
import MMDetails from "../../../Details/mech_marinedetails";
import CulDetails from "../../../Details/culturaldetails";
import archDetails from "../../../Details/archidetails";
import sportSenior from "../../../Details/sportsSeniorDetails";

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
        CSDetails[i].key = keys.cs;
        events[k] = CSDetails[i];
        k++;
      }
    }
  } else if (departmentName === "EE" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < EEDetails.length; i++) {
      if (EEDetails[i].type === "NT") {
        EEDetails[i].key = keys.ec;
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
        AUDetails[i].key = keys.aa;
        events[k] = AUDetails[i];
        k++;
      }
    }
  } else if (departmentName === "IS" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < ISDetails.length; i++) {
      if (ISDetails[i].type === "NT") {
        ISDetails[i].key = keys.is;
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
  } else if (departmentName === "MM" && eventType === "Technical") {
    let k = 0;
    for (let i = 0; i < MMDetails.length; i++) {
      if (MMDetails[i].type === "T") {
        events[k] = MMDetails[i];
        k++;
      }
    }
  } else if (departmentName === "MM" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < MMDetails.length; i++) {
      if (MMDetails[i].type === "NT") {
        MMDetails[i].key = keys.mm;
        events[k] = MMDetails[i];
        k++;
      }
    }
  } else if (departmentName === "all" && eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < CSDetails.length; i++) {
      CSDetails[i].key = keys.cs;
    }
    for (let i = 0; i < EEDetails.length; i++) {
      EEDetails[i].key = keys.ec;
    }
    for (let i = 0; i < AUDetails.length; i++) {
      AUDetails[i].key = keys.aa;
    }
    for (let i = 0; i < MMDetails.length; i++) {
      MMDetails[i].key = keys.mm;
    }
    for (let i = 0; i < ISDetails.length; i++) {
      ISDetails[i].key = keys.mm;
    }
    for (let i = 0; i < CulDetails.length; i++) {
      CulDetails[i].key = keys.envision;
    }
    for (let i = 0; i < archDetails.length; i++) {
      archDetails[i].key = keys.envision;
    }
    for (let i = 0; i < sportSenior.length; i++) {
      sportSenior[i].key = keys.envision;
    }
    const allDetails = [
      ...CSDetails,
      ...AUDetails,
      ...EEDetails,
      ...ISDetails,
      ...MMDetails,
      ...CulDetails,
      ...archDetails,
      ...sportSenior,
    ];
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
                  regfee={item.regfee}
                  fee={item.fee}
                  details={item.details}
                  time={item.time}
                  date={item.date}
                  rpkey={item.key}
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
