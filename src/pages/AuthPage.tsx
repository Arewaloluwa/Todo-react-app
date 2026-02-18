import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="py-6 bg-blue-600 shadow-md">
        <h1 className="text-center text-3xl text-white font-bold tracking-wide">Todo App</h1>
      </header>

      {/* Auth Section */}
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="w-full  max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow rounded-lg p-8 mt-12">
          {/* Login Section */}
          <div>
            <h2 className="text-xl font-bold text-center mb-6 text-blue-500">Login</h2>
            <Login />
          </div>
          {/* Divider for desktop */}
          <div className="hidden md:block border-r mx-2" aria-hidden="true"></div>
          {/* Register Section */}
          <div>
            <h2 className="text-xl font-bold text-center mb-6 text-green-500">Register</h2>
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
}