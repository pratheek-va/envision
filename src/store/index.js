import { configureStore } from "@reduxjs/toolkit";

const modalReducer = (state = { show: false, input: false }, action) => {
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
    modal: modalReducer,
    detail: detailReducer,
    event: eventTypeReducer,
    auth: authReducer,
  },
});

export default store;
