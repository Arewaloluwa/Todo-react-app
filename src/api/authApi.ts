const BASE_URL = "https://api.oluwasetemi.dev/auth";

export async function register({ name, email, password }: { name: string; email: string; password: string }) {
  const res = await fetch("https://api.oluwasetemi.dev/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}

export async function login({ email, password }: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json(); // Should return { accessToken, refreshToken, ... }
}

export async function getMe(token: string) {
  const res = await fetch(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Fetching user info failed");
  return await res.json(); // Should return { id, email, ... }
}

export async function logout(token: string) {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Logout failed");
  return true;
}