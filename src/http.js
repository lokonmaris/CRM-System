const BASE_API = `https://easydev.club/api/v2/todos`;

export async function fetchTodos(status) {
  const response = await fetch(`${BASE_API}?filter=${status}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Ошибка при просмотре списка задач");
  }

  return resData.data;
}

export async function addTodo(title) {
  const response = await fetch(BASE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, isDone: false }),
  });

  const newTodo = await response.json();

  if (!response.ok) {
    throw new Error("Ошибка при добавлении задачи");
  }

  return newTodo;
}

export async function deleteTodo(id) {
  await fetch(`${BASE_API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateTodo(id, updatedData) {
  const response = await fetch(`${BASE_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении задачи");
  }

  return response.json();
}
