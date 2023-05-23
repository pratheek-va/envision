import React from "react";

import { useSelector } from "react-redux";

import Main from "./components/UI/Main/Main";
import EventDetail from "./components/EventDetail/EventDetail";
import AOS from "aos";
import "aos/dist/aos.css";
import Input from "./components/Input/Input";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";
import FormModal from "./components/FormModal/FormModal";

function App() {
  AOS.init();
  const show = useSelector((state) => state.modal.show);
  const input = useSelector((state) => state.modal.input);
  const confirm = useSelector((state) => state.confirm.confirm);
  const form = useSelector((state) => state.form.form);

  return (
    <React.Fragment>
      {show && <EventDetail/>}
      {input && <Input/>}
      {confirm && <ConfirmModal/>}
      {form && <FormModal/>}
      <Main></Main>
    </React.Fragment>
  );
}

export default App;