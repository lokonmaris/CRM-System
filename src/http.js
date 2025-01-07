export async function fetchTodos(status) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${status}`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Ошибка при просмотре списка задач");
  }

  return resData.data;
}

export async function addTodo(title) {
  const response = await fetch(`https://easydev.club/api/v1/todos`, {
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
  await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { id };
}

export async function updateTodo(id, updatedData) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
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
