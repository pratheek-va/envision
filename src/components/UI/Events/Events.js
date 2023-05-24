import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";

import EventCard from "../../EventCard/EventCard";
import keys from "../../../Details/key/key";
import "./Events.css";

const Events = (props) => {
  const params = useParams();
  const { departmentName, eventType } = params;

  const [state, setStateData] = useState({
    eventDetails: []
  });

  const getEventDetails = async (departmentID) => {
    const response = await axios.get(`https://envision-sfxf.onrender.com/api/v1/events/department/${departmentID}`);
    return response.data.data.event;
  }

  const getAllEvents = async (searchText) => {
    if(!props.searchText) {
      const response = await axios.get('https://envision-sfxf.onrender.com/api/v1/events');
      return response.data.data.events; 
    } else {
      const response = await axios.get(`https://envision-sfxf.onrender.com/api/v1/events/search/${searchText}`);
      setStateData((currentData) => {
        return {
          ...currentData,
          eventDetails: response.data.data.events
        }
      });
    }
  }

  const getAllDepartmentEvents = async () => {
    const eventDetails = await getEventDetails(departmentName);

    setStateData((currentData) => {
      return {
        ...currentData,
        eventDetails
      }
    });
  }

  const getEvents = async () => {
    const eventDetails = await getAllEvents();
    setStateData((currentData) => {
      return {
        ...currentData,
        eventDetails
      }
    });
  }

  const fetchEvents = () => {
    if(departmentName === 'all') getEvents();
    else if(props.searchText) getAllEvents(props.searchText);
    else getAllDepartmentEvents();
  }

  useEffect(() => {
      fetchEvents();
  }, [props.searchText]);

  let events = [];
  const eventsArray = [];

  if(departmentName === 'all') {
    let k = 0;
    for (let i = 0; i < state.eventDetails.length; i++) {
      if (state.eventDetails[i].type === "NT") {
        state.eventDetails[i].key = keys[departmentName.toLowerCase()];
        events[k] = state.eventDetails[i];
        k++;
      }
    }
  }else if (eventType === "Technical") {
    let k = 0;
    for (let i = 0; i < state.eventDetails.length; i++) {
      if (state.eventDetails[i].type === "T") {
        events[k] = state.eventDetails[i];
        k++;
      }
    }
  } else if (eventType === "Non Technical") {
    let k = 0;
    for (let i = 0; i < state.eventDetails.length; i++) {
      if (state.eventDetails[i].type === "NT") {
        state.eventDetails[i].key = keys[departmentName.toLowerCase()];
        events[k] = state.eventDetails[i];
        k++;
      }
    }
  }else if(props.searchText){
    let k = 0;
    for (let i = 0; i < state.eventDetails.length; i++) {
      state.eventDetails[i].key = keys[state.eventDetails[i].department.toLowerCase()];
      events[k] = state.eventDetails[i];
      k++;
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
                  key={item._id}
                  id={item._id}
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
                  fetchEvents={fetchEvents}
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
