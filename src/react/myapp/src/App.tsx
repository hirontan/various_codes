import React, { useState } from "react";
import NewTodo from "./components/NewTodo";

import TodoList from "./components/TodoList";
import { Todo } from "./todo.model";

// function App() {
//   return <div className="App"></div>;
// }

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    console.log(text);
    setTodos([{ id: Math.random().toString(), text: text }]);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
