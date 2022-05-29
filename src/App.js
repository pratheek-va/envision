import React from "react";

import { useSelector } from "react-redux";

import Main from "./components/UI/Main/Main";
import EventDetail from "./components/EventDetail/EventDetail";
import AOS from "aos";
import "aos/dist/aos.css";
import Input from "./components/Input/Input";

function App() {
  AOS.init();
  const show = useSelector((state) => state.modal.show);
  const input = useSelector((state) => state.modal.input);
  const token = useSelector((state) => state.auth.token);

  return (
    <React.Fragment>
      {show && <EventDetail></EventDetail>}
      {input && <Input></Input>}
      <Main></Main>
    </React.Fragment>
  );
}

export default App;
