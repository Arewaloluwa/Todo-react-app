import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../../api/todoApi";
import Pagination from "../../components/Pagination";
import TodoFilter from "./TodoFilter";
import EditTodoModal from "./EditTodoModal";

export default function TodoList() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [editingTodo, setEditingTodo] = useState<any | null>(null); // null = add, object = edit
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", page, search, status],
    queryFn: () => fetchTodos(user?.accessToken ?? "", page, search, status),
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: ({ title, description }: { title: string; description: string }) =>
      addTodo(user?.accessToken ?? "", title, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (e: any) => setFormError(e.message || "Failed to add todo"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, title, description }: { id: string; title: string; description: string }) =>
      updateTodo(user?.accessToken ?? "", id, title, description),
    onSuccess: () => {
      setEditingTodo(null);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(user?.accessToken ?? "", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  function handleDelete(id: string) {
    if (!window.confirm("Delete this task?")) return;
    deleteMutation.mutate(id);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{(error as Error).message}</div>;

  return (
    <div>
      {/* Add Task Button is outside at page top – not duplicated here */}
      {formError && <div className="text-red-600 mb-2">{formError}</div>}

      {/* Filters */}
      <TodoFilter search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

      {/* Classy cards */}
      <div className="space-y-4 mt-4">
        {data?.todos.map((todo: any) => (
          <div
            key={todo.id}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-lg">{todo.title}</div>
              <div className="text-sm text-gray-600">{todo.description}</div>
              <div className="text-xs text-gray-400 mt-1">Status: {todo.status}</div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-yellow-700 px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 font-medium transition"
                onClick={() => setEditingTodo(todo)}
              >
                Edit
              </button>
              <button
                className="text-red-600 px-3 py-1 rounded bg-red-100 hover:bg-red-200 border border-red-300 font-medium transition"
                onClick={() => handleDelete(todo.id)}
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={data?.totalPages} onPageChange={setPage} />

      {/* Add/Edit Modal */}
      {editingTodo !== null && (
        <EditTodoModal
          todo={editingTodo}
          mode={editingTodo ? "edit" : "add"}
          onClose={() => setEditingTodo(null)}
          onSave={({ id, title, description }) => {
            if (editingTodo) {
              updateMutation.mutate({ id: editingTodo.id, title, description });
            } else {
              addMutation.mutate({ title, description });
            }
          }}
          isSaving={addMutation.isLoading || updateMutation.isLoading}
        />
      )}

      {/* Only show Add button if not editing! */}
      <div className="flex justify-end mt-8">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
          onClick={() => setEditingTodo(null)}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}