import React from "react";
import DeveloperCard from "../../DeveloperCard/DeveloperCard";

const Developer = () => {
  return (
    <React.Fragment>
      <div class="container py-4 event-card-container">
        <div className="row gx-5">
          <DeveloperCard
            name="Pratheek V A"
            role="Full Stack Developer"
            image="Pratheek-min.jpeg"
          ></DeveloperCard>

          <DeveloperCard
            name="Nikhil Ladwa"
            role="Content Developer"
            image="Nikhil-min.jpg"
          ></DeveloperCard>

          <DeveloperCard
            name="Rakshan B N"
            role="Front End Developer"
            image="Rakshan-min.jpg"
          ></DeveloperCard>

          <DeveloperCard
            name="Jaideep"
            role="Associate Developer"
            image="Jaideep-min.jpg"
          ></DeveloperCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Developer;
