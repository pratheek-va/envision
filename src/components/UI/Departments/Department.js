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
            name="Department of Electronics and Communication Engineering"
            code="EE"
            image="EEE.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Department of Automobile Engineering"
            code={"AU"}
            image="automobile.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Department of Information Science and Engineering"
            code={"IS"}
            image="information Science.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Department Mechanical and Marine Engineering"
            code={"MM"}
            image="mechanical.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="School Of Architecture"
            code={"SSA"}
            image="mechanical.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Cultural"
            code={"CUL"}
            image="mechanical.jpg"
          ></DepartmentCard>
          <DepartmentCard
            name="Sports"
            code={"SPO"}
            image="mechanical.jpg"
          ></DepartmentCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Department;
