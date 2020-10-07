import React from "react";
import NewTodo from "./components/NewTodo";

import TodoList from "./components/TodoList";

// function App() {
//   return <div className="App"></div>;
// }

const App: React.FC = () => {
  const todos = [{ id: "t1", text: "コースの完了" }];
  const todoAddHandler = (text: string) => {
    console.log(text);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
