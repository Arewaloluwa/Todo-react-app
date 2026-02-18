import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, updateTodo } from "../../api/todoApi";
import { useAuth } from "../../hooks/useAuth";

export default function AddEditTodoModal({ todo, onClose }) {
  const { user } = useAuth();
  const [title, setTitle] = useState(todo?.title || "");
  const [note, setNote] = useState(todo?.description || "");
  const [formError, setFormError] = useState("");
  const queryClient = useQueryClient();

  const isEdit = !!todo;
  const mutation = useMutation({
    mutationFn: isEdit
      ? () => updateTodo(user.accessToken, todo.id, title, note)
      : () => addTodo(user.accessToken, title, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    },
    onError: (e: any) => setFormError(e.message || "Failed to save todo"),
  });

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!title.trim()) { setFormError("Title is required."); return; }
    mutation.mutate();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border border-gray-200">
        <h3 className="text-xl font-medium mb-4">{isEdit ? "Edit" : "Add"} Task</h3>
        <label className="block mb-1 text-gray-700">Title</label>
        <input
          className="w-full border rounded p-2 mb-4 outline-none focus:ring focus:border-blue-600"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
        <label className="block mb-1 text-gray-700">Note</label>
        <textarea
          className="w-full border rounded p-2 mb-4 resize-none outline-none focus:ring focus:border-blue-600"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={4}
        />
        {formError && <div className="text-red-500 mb-3">{formError}</div>}
        <div className="flex justify-end gap-3">
          <button type="button" className="px-3 py-2 bg-gray-200 rounded" onClick={onClose} disabled={mutation.isLoading}>Cancel</button>
          <button type="submit" className={`px-4 py-2 rounded text-white ${mutation.isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`} disabled={mutation.isLoading}>{mutation.isLoading ? "Saving..." : (isEdit ? "Update" : "Save")}</button>
        </div>
      </form>
    </div>
  );
}