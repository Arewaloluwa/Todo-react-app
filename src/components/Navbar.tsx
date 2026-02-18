import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-200">
      <Link to="/todos" className="font-bold text-blue-700 text-lg">TodoApp</Link>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link to="/profile">{user.email}</Link>
            <button onClick={logout} className="bg-red-500 text-white rounded px-3 py-1">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-700">Login</Link>
            <Link to="/register" className="text-blue-700">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}