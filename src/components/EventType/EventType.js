import React from "react";
import { useParams } from "react-router-dom";
import EventTypeCard from "../EventTypeCard/EventTypeCard";

const EventType = () => {
  const params = useParams();

  return (
    <React.Fragment>
      <div class="container py-4 event-card-container">
        <div className="row gx-5">
          <EventTypeCard
            name={params.departmentName === "PP" ? "IT" : "Technical"}
            code={params.departmentName}
            image="tech.jpg"
          ></EventTypeCard>
          <EventTypeCard
            code=""
            name={params.departmentName === "PP" ? "NON IT" : "Non Technical"}
            image="nontech.jpg"
          ></EventTypeCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventType;
