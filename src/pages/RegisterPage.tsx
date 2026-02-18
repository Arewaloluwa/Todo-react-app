import Register from "../auth/Register";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="py-6 bg-blue-600 shadow-md mb-8">
        <h1 className="text-center text-3xl text-white font-bold tracking-wide">Todo App</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white px-8 py-10 rounded-lg shadow-md w-full max-w-md">
          <Register />
          <div className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
}