import { useState } from "react";

export default function UserInput({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [inputError, setInputError] = useState("");

  const handleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todoTitle.length < 2) {
      setInputError("Минимальная длина - 2 символа");
      return;
    } else if (todoTitle.length > 64) {
      setInputError("Максимальная длина - 64 символа");
      return;
    } else {
      setInputError("");
    }

    onAddTodo(todoTitle);
    setTodoTitle("");
  };

  return (
    <div>
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
      {inputError ? <p className="error">{inputError}</p> : undefined}
    </div>
  );
}
