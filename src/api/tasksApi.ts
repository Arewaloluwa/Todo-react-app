import axios from "axios";

const API_BASE = "https://api.oluwasetemi.dev";


function getAuthHeaders() {
  const token = localStorage.getItem("accessToken"); 
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// GET /tasks - List all tasks
export async function fetchTasks() {
  const res = await axios.get(`${API_BASE}/tasks`, { headers: getAuthHeaders() });
  return res.data;
}

// POST /tasks - Create a task
export async function createTask(task: {
  name: string;
  description?: string | null;
  start?: string | null;
  end?: string | null;
  duration?: number | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: string;
  archived?: boolean;
  isDefault?: boolean | null;
  parentId?: string | null;
  children?: string[] | null;
  owner?: string | null;
  tags?: string[] | null;
  completedAt?: string | null;
}) {
  const res = await axios.post(`${API_BASE}/tasks`, task, { headers: {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  }});
  return res.data;
}

// GET /tasks/{id} - Get one task by id
export async function fetchTaskById(id: string) {
  const res = await axios.get(`${API_BASE}/tasks/${id}`, { headers: getAuthHeaders() });
  return res.data;
}

// GET /tasks/{id}/children - Get children of a task
export async function fetchTaskChildren(id: string) {
  const res = await axios.get(`${API_BASE}/tasks/${id}/children`, { headers: getAuthHeaders() });
  return res.data;
}

// PATCH /tasks/{id} - Update a task
export async function updateTask(id: string, updates: Partial<{
  name: string;
  description?: string | null;
  start?: string | null;
  end?: string | null;
  duration?: number | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: string;
  archived?: boolean;
  isDefault?: boolean | null;
  parentId?: string | null;
  children?: string[] | null;
  owner?: string | null;
  tags?: string[] | null;
  completedAt?: string | null;
}>) {
  const res = await axios.patch(`${API_BASE}/tasks/${id}`, updates, { headers: {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  }});
  return res.data;
}

// DELETE /tasks/{id} - Delete a task
export async function deleteTaskById(id: string) {
  const res = await axios.delete(`${API_BASE}/tasks/${id}`, { headers: getAuthHeaders() });
  return res.data;
}