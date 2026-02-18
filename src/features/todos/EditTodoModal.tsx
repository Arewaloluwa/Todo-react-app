import { useState } from "react";

export default function EditTodoModal({ todo, mode, onClose, onSave, isSaving }) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [formError, setFormError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }
    onSave({ id: todo?.id, title, description });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border border-gray-200"
      >
        <h3 className="text-xl font-medium mb-4">{mode === "edit" ? "Edit Task" : "Add Task"}</h3>
        <label className="block mb-1 text-gray-700">Title</label>
        <input
          className="w-full border rounded p-2 mb-4 outline-none focus:ring focus:border-blue-600"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
        <label className="block mb-1 text-gray-700">Note</label>
        <textarea
          className="w-full border rounded p-2 mb-4 resize-none focus:ring focus:border-blue-600"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
        />
        {formError && <div className="text-red-500 mb-3">{formError}</div>}
        <div className="flex justify-end gap-3">
          <button type="button" className="px-3 py-2 bg-gray-200 rounded" onClick={onClose} disabled={isSaving}>Cancel</button>
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${isSaving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : (mode === "edit" ? "Update" : "Save")}
          </button>
        </div>
      </form>
    </div>
  );
}