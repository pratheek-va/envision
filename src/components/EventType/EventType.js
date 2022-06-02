import React from "react";
import { useParams } from "react-router-dom";
import keys from "../../Details/key/key";
import EventTypeCard from "../EventTypeCard/EventTypeCard";
import paperus from "../../Details/paperus";

const EventType = () => {
  const params = useParams();

  return (
    <React.Fragment>
      <div class="container py-4 event-card-container">
        <div className="row gx-5">
          <EventTypeCard
            name={params.departmentName === "PP" ? "IT" : "Technical"}
            code={params.departmentName}
            image={params.departmentName === "PP" ? "itpp.png" : "tech.jpg"}
            rpkey={keys.envision}
            nevents={
              params.departmentName === "AU" && params.departmentName === "IS"
                ? 4
                : 3
            }
            ename={paperus[0].name}
            venue={paperus[0].venue}
            rules={paperus[0].rules}
            orgname={paperus[0].orgname}
            orgno={paperus[0].orgno}
            eimage={paperus[0].image}
            rounds={paperus[0].rounds ? paperus[0].rounds : false}
            regfee={paperus[0].regfee}
            fee={paperus[0].fee}
            details={paperus[0].details}
            time={paperus[0].time}
          ></EventTypeCard>
          <EventTypeCard
            code=""
            name={params.departmentName === "PP" ? "NON IT" : "Non Technical"}
            image={
              params.departmentName === "PP" ? "nonitpp.png" : "nontech.jpg"
            }
            rpkey={keys.envision}
            ename={paperus[1].name}
            venue={paperus[1].venue}
            rules={paperus[1].rules}
            orgname={paperus[1].orgname}
            orgno={paperus[1].orgno}
            eimage={paperus[1].image}
            rounds={paperus[1].rounds ? paperus[1].rounds : false}
            regfee={paperus[1].regfee}
            fee={paperus[1].fee}
            details={paperus[1].details}
            time={paperus[1].time}
            date={paperus[1].date}
          ></EventTypeCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventType;
