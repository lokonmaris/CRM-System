import { useState } from "react";
import { addTodo } from "../../http.js";
import styles from "./AddTodo.module.css";

export default function AddTodo({ setError, status, updateData }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [inputError, setInputError] = useState("");

  async function handleAddTodo(newTodoTitle) {
    try {
      await addTodo(newTodoTitle);
      await updateData(status);
    } catch (error) {
      setError({ message: error.message || "Не удалось добавить задачу" });
    }
  }

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

    handleAddTodo(todoTitle);
    setTodoTitle("");
  };

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="userinput"
          placeholder="Введите название задачи..."
          value={todoTitle}
          onChange={handleChange}
        />
        <button type="submit" className={styles.submitBtn}>
          Добавить задачу
        </button>
      </form>
      {inputError ? <p className={styles.error}>{inputError}</p> : undefined}
    </div>
  );
}
