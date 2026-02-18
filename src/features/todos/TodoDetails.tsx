import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth"; 
import { fetchTodo } from "../../api/todoApi";

export default function TodoDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: todo, isLoading, error } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(user!.accessToken, id!),
    enabled: !!(user && id)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{(error as Error).message}</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{todo.title}</h2>
      <p>{todo.description}</p>
      <div className={`my-2 ${todo.completed ? "text-green-700" : "text-yellow-700"}`}>
        {todo.completed ? "Complete" : "Incomplete"}
      </div>
      <Link to="/todos" className="text-blue-600 underline">← Back to list</Link>
    </div>
  );
}