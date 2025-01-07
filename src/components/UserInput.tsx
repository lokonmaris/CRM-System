import { useState } from "react";

export default function UserInput({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todoTitle.length < 2 || todoTitle.length > 64) {
      alert("XXX");
      return;
    }

    onAddTodo(todoTitle);
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleSubmit} id="input-container">
      <input
        type="text"
        id="userinput"
        placeholder="Введите название задачи..."
        value={todoTitle}
        onChange={handleChange}
      />
      <button type="submit" id="submit-btn">
        Добавить задачу
      </button>
    </form>
  );
}
