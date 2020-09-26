import React from "react";
// import React, { useContext } from "react";

// import { ADD_OPERATION_LOG, DELETE_EVENT } from "../actions";

// import AppContext from "../contexts/AppContext";
// import operationLogs from "../reducers/operationLogs";

// import { timeCurrentIso8601 } from "../utils";

const OperationLog = ({ operationLog }) => {
  // const { dispatch } = useContext(AppContext);
  return (
    <tr>
      <td>{operationLog.description}</td>
      <td>{operationLog.operatedAt}</td>
    </tr>
  );
};

export default OperationLog;
