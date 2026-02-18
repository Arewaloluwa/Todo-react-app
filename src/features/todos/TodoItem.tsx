type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  // ...add fields as needed
};

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="p-2 border rounded mb-1">
      <h3 className="font-bold">{todo.title}</h3>
      <p>{todo.description}</p>
      <span className={`text-xs ${todo.completed ? "text-green-700" : "text-yellow-700"}`}>
        {todo.completed ? "Complete" : "Incomplete"}
      </span>
    </div>
  );
}