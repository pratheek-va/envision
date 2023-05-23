import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import keys from "../../Details/key/key";
import axios from "axios";

import EventCard from "../EventCard/EventCard";

const Extras = () => {
  const [state, setStateData] = useState({
    eventDetails: []
  });

  let events = [];
  const eventsArray = [];

  const params = useParams();

  const { extra } = params;
  
  const getEventDetails = async (departmentID) => {
    const response = await axios.get(`http://localhost:5000/api/v1/events/department/${departmentID}`);
    return response.data.data.event;
  }

  const getAllDepartmentEvents = async () => {
    const eventDetails = await getEventDetails(extra);
    setStateData((currentData) => {
      return {
        ...currentData,
        eventDetails
      }
    });
  }

  useEffect(() => {
    getAllDepartmentEvents();
  }, []);

  for (let i = 0; i < state.eventDetails.length; i++) {
    state.eventDetails[i].key = keys['envision'];
    events[i] = state.eventDetails[i];
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

export default Extras;