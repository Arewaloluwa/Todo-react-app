import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="text-center mt-12">
      <h1 className="text-3xl font-bold text-red-700 mb-2">404 - Not Found</h1>
      <p>The page you requested doesn’t exist.</p>
      <Link to="/" className="text-blue-700 underline">Go Home</Link>
    </section>
  );
}