import React, { useReducer } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import EventForm from "./EventForm";

import Events from "./Events";

// indexは省略できる
import reducer from "../reducers";

const App = () => {
  // 第三引数には初期化時に入れたい状態を格納できる
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <div className="container-fluid">
      <EventForm state={state} dispatch={dispatch} />
      <Events state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;
