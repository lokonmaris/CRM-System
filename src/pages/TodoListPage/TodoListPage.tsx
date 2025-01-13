import { useState } from "react";
import { TodoRequest, Todo, TodoInfo, MetaResponse } from "../../api/api.ts";
import AddTodo from "../../components/AddTodo/AddTodo.tsx";
import TodoTabs from "../../components/TodoTabs/TodoTabs.tsx";
import TodoList from "../../components/TodoList/TodoList.tsx";
import Error from "../../components/Error/Error.tsx";
import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const [status, setStatus] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [error, setError] = useState();
  const [activeTab, setActiveTab] = useState("all");

  if (error) {
    return <Error title="Произошла ошибка!" message={error.message} />;
  }

  return (
    <div className={styles.todoList}>
      <AddTodo
        setTodoList={setTodoList}
        setAllTodos={setAllTodos}
        setError={setError}
        status={status}
      />
      <TodoTabs
        setStatus={setStatus}
        allTodos={allTodos}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        setAllTodos={setAllTodos}
        setError={setError}
        status={status}
        activeTab={activeTab}
      />
    </div>
  );
}
