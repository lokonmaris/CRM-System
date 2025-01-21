import { useState, useEffect } from "react";
import { TodoRequest, Todo, TodoInfo, MetaResponse } from "../../api/api.ts";
import { fetchTodos } from "../../http.js";
import AddTodo from "../../components/AddTodo/AddTodo.tsx";
import TodoTabs from "../../components/TodoTabs/TodoTabs.tsx";
import TodoList from "../../components/TodoList/TodoList.tsx";
import Error from "../../components/Error/Error.tsx";
import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const [status, setStatus] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState();
  const [activeTab, setActiveTab] = useState("all");
  const [todoInfo, setTodoInfo] = useState();

  const updateData = async (status) => {
    try {
      const resData = await fetchTodos(status);
      setTodoList(resData.data);
      setTodoInfo(resData.info);
      console.log(todoInfo);
      
    } catch (error) {
      setError({ message: error.message || "Не удалось загрузить данные" });
    }
  };

  useEffect(() => {
    updateData(status);
  }, [status]);

  if (error) {
    return <Error title="Произошла ошибка!" message={error.message} />;
  }

  return (
    <div className={styles.todoList}>
      <AddTodo
        setTodoList={setTodoList}
        setError={setError}
        status={status}
        updateData={updateData}
      />
      <TodoTabs
        setStatus={setStatus}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        todoInfo={todoInfo}
      />
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        setError={setError}
        status={status}
        updateData={updateData}
      />
    </div>
  );
}
