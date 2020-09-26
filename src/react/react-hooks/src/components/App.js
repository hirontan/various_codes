import React, { useReducer } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import EventForm from "./EventForm";

import Events from "./Events";
import AppContext from "../contexts/AppContext";

// indexは省略できる
import reducer from "../reducers";
import OperationLogs from "./OperationLogs";

const App = () => {
  const initialState = {
    events: [],
    operationLogs: [],
  };
  // 第三引数には初期化時に入れたい状態を格納できる
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container-fluid">
        <EventForm />
        <Events />
        <OperationLogs />
      </div>
    </AppContext.Provider>
  );
};

export default App;
