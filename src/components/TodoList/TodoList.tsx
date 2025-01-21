import Todo from "../Todo/Todo.tsx";
import { updateTodo, deleteTodo } from "../../http.js";
import styles from "./TodoList.module.css";

export default function TodoList({ todoList, setError, status, updateData }) {
  async function handleDeleteTodo(id) {
    try {
      await deleteTodo(id);
      updateData(status);
    } catch (error) {
      setError({ message: error.message || "Не удалось удалить задачу" });
    }
  }

  async function handleEditTodo(id, title) {
    try {
      await updateTodo(id, { title });
      await updateData(status);
    } catch (error) {
      setError({ message: error.message || "Не удалось редактировать задачу" });
    }
  }

  async function handleUpdateStatus(id, isDone) {
    try {
      await updateTodo(id, { isDone });
      await updateData(status);
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
            updateData={updateData}
            status={status}
          />
        ))}
      </ol>
    </div>
  );
}
