const BASE_URL = "https://api.oluwasetemi.dev/todos";

// Add todos.
export async function addTodo(token: string, name: string, description?: string) {
  const res = await fetch("https://api.oluwasetemi.dev/todos", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return await res.json();
}

// List todos with pagination and optional filters
export async function fetchTodos(token: string, page = 1, q = "", status = "") {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (q) params.set("q", q);
  if (status) params.set("status", status);

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

// Get one todo
export async function fetchTodo(token: string, id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch todo");
  return await res.json();
}

// Create a todo
export async function createTodo(token: string, data: { title: string; description?: string }) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return await res.json();
}

// Update a todo
export async function updateTodo(token: string, id: string, data: Partial<{ title: string; description: string; completed: boolean }>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return await res.json();
}

// Delete a todo
export async function deleteTodo(token: string, id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return true;
}