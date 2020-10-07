import React, { useRef } from "react";

import "./NewTodo.css";

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  // DOM要素にアクセス
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
    props.onAddTodo(enteredText);
  };

  return (
    <form>
      <div className="form-controll">
        <label htmlFor="todo-text">Todo内容</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit" onClick={todoSubmitHandler}>
        TODO追加
      </button>
    </form>
  );
};

export default NewTodo;
