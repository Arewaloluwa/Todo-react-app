import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-center p-16">
      <h1 className="text-3xl font-bold mb-4 test-center test-grey-900">Welcome to Todo App</h1>
      <p className="mb-6">Track your tasks, manage your time.</p>
      <Link to="/todos" className="bg-blue-600 text-white px-6 py-2 rounded">
        Go to Todos
      </Link>
    </section>
  );
}