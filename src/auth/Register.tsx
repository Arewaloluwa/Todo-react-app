import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $name: String, $imageUrl: String) {
    register(email: $email, password: $password, name: $name, imageUrl: $imageUrl) {
      user {
        id
        email
        name
        imageUrl
        isActive
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`;

export default function Register() {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Name is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setFormError(
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character."
      );
      return;
    }
    await register(email, password, name);
    // Optionally: navigate("/todos");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-12 space-y-3">
      <h2 className="text-xl font-bold">Register</h2>
      {(formError || error) && (
        <div className="text-red-600">{formError || error}</div>
      )}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        required
        onChange={e => setName(e.target.value)}
        className="w-full border p-2"
        autoComplete="name"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        className="w-full border p-2"
        autoComplete="email"
      />
      
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 pr-10"
          autoComplete="new-password"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
          onClick={() => setShowPassword((show) => !show)}
          tabIndex={-1}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}