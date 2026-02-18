import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <div>Not logged in.</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      {/* Render other user info if available */}
      <button onClick={logout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}