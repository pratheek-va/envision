import { configureStore } from "@reduxjs/toolkit";

const formReducer = (state = { form: false }, action) => {
  if(action.type === 'FORM_OPEN') {
    return { ...state, form: true, onClick: action.onClick, id: action.id };
  }else if(action.type === 'FORM_CLOSE') {
    return { ...state, form: false };
  }
  return state;
}

const confirmReducer = (state = { confirm: false, id: '', title: '', confirmationText: '', onClick: null }, action) => {
  if(action.type === 'CONFIRM') {
    return { ...state, confirm: true, id: action.id, onClick: action.onClick, title: action.title, confirmationText: action.confirmationText };
  }else if(action.type === 'CONFIRM_CLOSE') {
    return { ...state, confirm: false };
  }
  return state;
}

const modalReducer = (state = { show: false, input: false, confirm: false }, action) => {
  if (action.type === "SHOW") {
    return { ...state, show: true };
  } else if (action.type === "CLOSE") {
    return { ...state, show: false, input: false };
  } else if (action.type === "INPUT") {
    return { ...state, input: true };
  }
  return state;
};

const detailReducer = (
  state = {
    rules: [],
    orgname: "",
    orgno: "",
    image: "",
    name: "",
    venue: "",
    regfee: "",
    fee: 0,
    details: "",
    key: {},
  },
  action
) => {
  if (action.type === "SEND") {
    return {
      ...state,
      rules: action.rules,
      orgname: action.orgname,
      orgno: action.orgno,
      image: action.image,
      name: action.name,
      rounds: action.rounds,
      venue: action.venue,
      regfee: action.regfee,
      fee: action.fee,
      details: action.details,
      key: action.key,
    };
  }
  return state;
};

const eventTypeReducer = (state = { eventType: "" }, action) => {
  if (action.type === "TECHNICAL")
    return {
      ...state,
      eventType: "TECHNICAL",
    };
  else if (action.type === "NON-TECHNICAL")
    return {
      ...state,
      eventType: "NON-TECHNICAL",
    };

  return state;
};

const currentUser = {
  token: "",
  email: "",
};

const authReducer = (state = currentUser, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      token: action.token,
      email: action.email,
    };
  } else if (action.type === "LOGOUT") {
    return {
      ...state,
      token: action.token,
      email: action.email,
    };
  }

  return state;
};

const store = configureStore({
  reducer: {
    confirm: confirmReducer,
    modal: modalReducer,
    detail: detailReducer,
    event: eventTypeReducer,
    auth: authReducer,
    form: formReducer
  },
});

export default store;