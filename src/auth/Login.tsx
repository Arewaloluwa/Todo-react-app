import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { login, loading, error, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    // Optionally redirect on success:
    if (user) navigate("/todos");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-12 space-y-3">
      <h2 className="text-xl font-bold">Login</h2>
      {error && <div className="text-red-600">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        className="w-full border p-2"
      />
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}