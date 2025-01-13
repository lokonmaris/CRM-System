import { useState } from "react";
import styles from "./Todo.module.css";

export default function Todo({
  todo,
  onDeleteTodo,
  onEditTodo,
  onUpdateStatus,
  activeTab,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editError, setEditError] = useState("");

  const handleEdit = (title) => {
    setEditError("");
    setIsEdit(true);
    setEditTitle(title);
  };

  const handleSave = (id) => {
    if (editTitle.length < 2) {
      setEditError("Минимальная длина - 2 символа");
      return;
    } else if (editTitle.length > 64) {
      setEditError("Максимальная длина - 64 символа");
      return;
    } else {
      setEditError("");
    }

    onEditTodo(id, editTitle);
    setIsEdit(false);
    setEditTitle("");
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditTitle("");
  };

  return (
    <li>
      {isEdit ? (
        <>
          <div className={styles.editMode}>
            <input
              type="text"
              value={editTitle}
              name={todo.title}
              id={todo.title}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div>
              <button onClick={() => handleSave(todo.id)}>
                <i className="fas fa-check"></i>
              </button>
              <button onClick={handleCancel}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          {editError ? <p className={styles.error}>{editError}</p> : undefined}
        </>
      ) : (
        <div
          className={
            todo.isDone
              ? `${styles.todoItem} ${styles.strike}`
              : styles.todoItem
          }
        >
          <div>
            <input
              type="checkbox"
              name={todo.title}
              id={todo.title}
              checked={todo.isDone}
              onChange={() => onUpdateStatus(todo.id, !todo.isDone)}
            />
            <label htmlFor={todo.title}>{todo.title}</label>
          </div>
          <div>
            <button onClick={() => handleEdit(todo.title)}>
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button onClick={() => onDeleteTodo(todo.id, activeTab)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
