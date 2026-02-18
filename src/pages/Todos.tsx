import { useState } from "react";
import TodoList from "../features/todos/TodoList";
import AddEditTodoModal from "../features/todos/AddEditTodoModal";

export default function Todos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Todos</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
            onClick={() => { setEditingTodo(null); setModalOpen(true); }}
          >
            Add Task
          </button>
        </div>
        {/* Use the imported TodoList (which fetches and shows tasks) */}
        <TodoList 
          onEdit={todo => { setEditingTodo(todo); setModalOpen(true); }}
        />
      </div>
      {modalOpen && (
        <AddEditTodoModal
          todo={editingTodo}
          onClose={() => setModalOpen(false)}
          // optionally: onSaved={refreshTodos} to reload on save
        />
      )}
    </div>
  );
}