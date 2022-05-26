import React from "react";
import DeveloperCard from "../../DeveloperCard/DeveloperCard";

const Developer = () => {
  return (
    <React.Fragment>
      <div class="container py-4 event-card-container">
        <div className="row gx-5">
          <DeveloperCard
            name="Rakshan B N"
            role="Full Stack Developer"
            image="Rakshan-min.jpg"
          ></DeveloperCard>
          <DeveloperCard
            name="Pratheek V A"
            role="Full Stack Developer"
            image="Pratheek-min.jpeg"
          ></DeveloperCard>
          <DeveloperCard
            name="Nikhil Ladwa"
            role="Full Stack Developer"
            image="Nikhil-min.jpg"
          ></DeveloperCard>
          <DeveloperCard
            name="Jaideep"
            role="Full Stack Developer"
            image="Jaideep-min.jpg"
          ></DeveloperCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Developer;
