import { Link } from "react-router-dom";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  // ...add fields as needed
};

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div>
        <Link to={`/todos/${todo.id}`} className="font-semibold text-blue-700">{todo.title}</Link>
        <span className={`ml-2 text-xs rounded px-2 py-0.5 ${todo.completed ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}`}>
          {todo.completed ? "Complete" : "Incomplete"}
        </span>
      </div>
      {/* Add edit/delete icons if needed */}
    </div>
  );
}