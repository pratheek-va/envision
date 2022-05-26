import React from "react";
import EventTypeCard from "../EventTypeCard/EventTypeCard";

const EventType = () => {
  return (
    <React.Fragment>
      <div class="container py-4 event-card-container">
        <div className="row gx-5">
          <EventTypeCard name="Technical" image="tech.jpg"></EventTypeCard>
          <EventTypeCard
            name="Non Technical"
            image="nontech.jpg"
          ></EventTypeCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventType;
