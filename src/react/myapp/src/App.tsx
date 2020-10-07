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
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
