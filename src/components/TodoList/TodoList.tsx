import { useEffect } from "react";
import Todo from "../Todo/Todo.tsx";
import { fetchTodos, updateTodo, deleteTodo } from "../../http.js";
import styles from "./TodoList.module.css";

export default function TodoList({
  todoList,
  setTodoList,
  setAllTodos,
  setError,
  status,
  activeTab,
}) {
  useEffect(() => {
    async function fetchTodoList(status) {
      try {
        const data = await fetchTodos(status);
        const allTasks = await fetchTodos("all");
        setTodoList(data);
        setAllTodos(allTasks);
      } catch (error) {
        setError({ message: error.message || "Не удалось получить данные" });
      }
    }

    fetchTodoList(status);
  }, [status]);

  async function handleDeleteTodo(id, currentStatus) {
    try {
      await deleteTodo(id);
      const data = await fetchTodos(currentStatus);
      const allTasks = await fetchTodos("all");
      setTodoList(data);
      setAllTodos(allTasks);
    } catch (error) {
      setError({ message: error.message || "Не удалось удалить задачу" });
    }
  }

  async function handleEditTodo(id, title) {
    try {
      await updateTodo(id, { title });
      const data = await fetchTodos(status);
      const allTasks = await fetchTodos("all");
      setTodoList(data);
      setAllTodos(allTasks);
    } catch (error) {
      setError({ message: error.message || "Не удалось редактировать задачу" });
    }
  }

  async function handleUpdateStatus(id, isDone) {
    try {
      await updateTodo(id, { isDone });
      const data = await fetchTodos(status);
      const allTasks = await fetchTodos("all");
      setTodoList(data);
      setAllTodos(allTasks);
    } catch (error) {
      setError({ message: error.message || "Не удалось обновить задачу" });
    }
  }

  return (
    <div>
      <ol className={styles.todos}>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
            activeTab={activeTab}
          />
        ))}
      </ol>
    </div>
  );
}
