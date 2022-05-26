import React from "react";

import { useSelector } from "react-redux";

import Main from "./components/UI/Main/Main";
import EventDetail from "./components/EventDetail/EventDetail";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContextProvider } from "./store/auth-context";

function App() {
  AOS.init();
  const show = useSelector((state) => state.modal.show);

  return (
    <React.Fragment>
      <AuthContextProvider>
        {show && <EventDetail></EventDetail>}
      </AuthContextProvider>
      <Main></Main>
    </React.Fragment>
  );
}

export default App;
