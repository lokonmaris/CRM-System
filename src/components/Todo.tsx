import { useState } from "react";

export default function Todo({
  todos,
  onUpdateStatus,
  onDeleteTodo,
  onEditTodo,
}) {
  const [editingId, setEditingId] = useState();
  const [editTitle, setEditTitle] = useState("");
  const [editError, setEditError] = useState("");

  const handleEdit = (id, title) => {
    setEditError("");
    setEditingId(id);
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
    setEditingId();
    setEditTitle("");
  };

  const handleCancel = () => {
    setEditingId();
    setEditTitle("");
  };

  return (
    <div id="todo-list">
      <ol className="todos">
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <div className="edit-mode">
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
                {editError ? <p className="error">{editError}</p> : undefined}
              </>
            ) : (
              <div className={todo.isDone ? "todo-item strike" : "todo-item"}>
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
                  <button onClick={() => handleEdit(todo.id, todo.title)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button onClick={() => onDeleteTodo(todo.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
