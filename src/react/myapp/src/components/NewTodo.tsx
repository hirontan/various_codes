import React, { useRef } from "react";

const NewTodo: React.FC = () => {
  // DOM要素にアクセス
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSunmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
  };

  return (
    <form>
      <div>
        <label htmlFor="todo-text">Todo内容</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">TODO追加</button>
    </form>
  );
};

export default NewTodo;
