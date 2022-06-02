import React from "react";
import DepartmentCard from "../../DepartmentCard/DepartmentCard";

const Department = () => {
  return (
    <React.Fragment>
      <div class="container py-4">
        <div className="row gx-5">
          <DepartmentCard
            name="Department of Computer Science and Engineering"
            code={"CS"}
            image="computerScience.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Department of EEE and EC Engineering"
            code="EE"
            image="EEE.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Department of Automobile and Aeronautical Engineering"
            code={"AU"}
            image="automobile.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Department of IS and AIML Science and Engineering"
            code={"IS"}
            image="information Science.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Department of Mechanical and Marine Engineering"
            code={"MM"}
            image="mechanical.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="School Of Architecture"
            code={"SSA"}
            image="department-card-9.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Cultural"
            code={"CUL"}
            image="department-card-7.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Sports"
            code={"SPORTS"}
            image="department-card-8.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Paperus"
            code={"PP"}
            image="paperus.png"
          ></DepartmentCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Department;
