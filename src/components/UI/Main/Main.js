import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./../Home/Home";
import Header from "./../../Header/Header";
import Events from "./../Events/Events";
import Department from "../Departments/Department";
import Footer from "../../Footer/Footer";
import Aboutus from "../Aboutus/Aboutus";
import Gallery from "../Gallery/Gallery";
import Developer from "../Developer/Developer";
import EventType from "../../EventType/EventType";
import TAC from "../../TAC/TAC";
import PrivacyPolicy from "../../PrivacyPolicy/PrivacyPolicy";
import Extras from "../../Extras/Extras";
import Sponsors from "../Sponsors/Sponsors";
import ContactUs from "../../ContactUs/ContactUs";
import AdminPage from "../AdminPage/AdminPage";

const Main = () => {
  const [state, setStateData] = useState({search: ''});

  const setSearch = (searchText) => {
    setStateData((currentData) => {
      return {
        ...currentData,
        search: searchText
      }
    })
  };

  return (
    <React.Fragment>
      <Header setSearch={setSearch}></Header>
      {!state.search && <><Route path="/" exact>
        <Redirect to="/home" exact />
      </Route><Route path="/home" exact>
          <Home searchText={state.search}></Home>
        </Route><Route path="/events" exact>
          <Department></Department>
        </Route><Route path="/events/:departmentName" exact>
          <EventType></EventType>
        </Route><Route path="/:extra/events" exact>
          <Extras></Extras>
        </Route><Route path="/events/:departmentName/:eventType" exact>
          <Events></Events>
        </Route><Route path="/contactus" exact>
          <ContactUs></ContactUs>
        </Route><Route path="/sponsors" exact>
          <Sponsors></Sponsors>
        </Route><Route path="/aboutus" exact>
          <Aboutus></Aboutus>
        </Route><Route path="/developerteam" exact>
          <Developer></Developer>
        </Route><Route path="/gallery" exact>
          <Gallery></Gallery>
        </Route><Route path="/tandconditions">
          <TAC></TAC>
        </Route><Route path="/privacy-policy">
          <PrivacyPolicy></PrivacyPolicy>
        </Route><Route path="/admin">
          <AdminPage></AdminPage>
        </Route></> || <Events searchText={state.search}/>}
      <Footer></Footer>
    </React.Fragment>
  );
};

export default Main;
