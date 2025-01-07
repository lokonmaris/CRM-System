import { useEffect, useState } from "react";

import UserInput from "./components/UserInput.tsx";
import TabButton from "./components/TabButton.tsx";
import Todo from "./components/Todo.tsx";
import Error from "./components/Error.tsx";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "./http.js";

interface TodoRequest {
  title?: string;
  isDone?: boolean; // изменение статуса задачи происходит через этот флаг
}

interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState("all");
  const [error, setError] = useState();

  function handleStatusChange(selectedButton) {
    setStatus(selectedButton);
  }

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

  if (error) {
    return <Error title="Произошла ошибка!" message={error.message} />;
  }

  const countTasks = (filterStatus) => {
    if (filterStatus === "all") {
      return allTodos.length;
    }
    if (filterStatus === "completed") {
      return allTodos.filter((todo) => todo.isDone).length;
    }
    if (filterStatus === "inWork") {
      return allTodos.filter((todo) => !todo.isDone).length;
    }
    return 0;
  };

  async function handleAddTodo(newTodoTitle) {
    try {
      const newTask = await addTodo(newTodoTitle);
      setAllTodos((prevTodos) => [...prevTodos, newTask]);
      setTodoList((prevTodos) => [...prevTodos, newTask]);
    } catch (error) {
      setError({ message: error.message || "Не удалось добавить задачу" });
    }
  }

  async function handleDeleteTodo(id) {
    try {
      await deleteTodo(id);
      setAllTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id != id));
    } catch (error) {
      setError({ message: error.message || "Не удалось удалить задачу" });
    }
  }

  async function handleEditTodo(id, title) {
    try {
      const editedTodo = await updateTodo(id, { title });
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: editedTodo.title } : todo
        )
      );
    } catch (error) {
      setError({ message: error.message || "Не удалось редактировать задачу" });
    }
  }

  async function handleUpdateStatus(id, isDone) {
    try {
      await updateTodo(id, { isDone });
      setAllTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone } : todo))
      );
      {
        status === "all"
          ? setTodoList((prevTodos) =>
              prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone } : todo
              )
            )
          : setTodoList((prevTodos) =>
              prevTodos.filter((todo) => todo.id !== id)
            );
      }
    } catch (error) {
      setError({ message: error.message || "Не удалось обновить задачу" });
    }
  }

  return (
    <div id="task-menu">
      <UserInput onAddTodo={handleAddTodo} />
      <menu>
        <TabButton onSelect={() => handleStatusChange("all")}>
          Все ({countTasks("all")})
        </TabButton>
        <TabButton onSelect={() => handleStatusChange("inWork")}>
          В работе ({countTasks("inWork")})
        </TabButton>
        <TabButton onSelect={() => handleStatusChange("completed")}>
          Сделано ({countTasks("completed")})
        </TabButton>
      </menu>
      <Todo
        todos={todoList}
        onDeleteTodo={handleDeleteTodo}
        onUpdateStatus={handleUpdateStatus}
        onEditTodo={handleEditTodo}
      />
    </div>
  );
}

export default App;
